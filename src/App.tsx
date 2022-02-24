import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Card, Deck, addCard} from "./card"

import Menu from './menu';
import Cardlist from "./cardlist"
import EditModal from "./editmodal"
import Quiz from "./quiz"

type Props = {}

type State = {
  inQuiz: boolean,
  showEditModal: boolean,
  deck: Deck,
  editingCard: Card,
  editingCardIndex: number,
  showAnswer: boolean,
  atEndOfDeck: boolean,
  currentQuizIndex: number,
}

class App extends React.Component {
  state = {
    inQuiz: false,
    showEditModal: false,
    deck: new Deck(),
    editingCard: new Card("front1","back2"),
    editingCardIndex: 0,
    showAnswer: false,
    atEndOfDeck: false,
    currentQuizIndex: 0,
  }

  handleMenuEvent = (type: string) => {
    if (this.state.showEditModal) return //Don't acknowledge button clicks if modal is open & covering
    switch (type) {

      case "startquiz":
        //todo
        this.setState({inQuiz: true});
        break;
      case "endquiz":
        //todo
        this.setState({inQuiz: false});
        break;
    }

    if (!this.state.inQuiz) {  //these buttons only work in card view
      switch (type) {
        case "import":
          //todo
          break;
        case "export":
          //todo
          break;
        case "add":
          this.setState({
            deck: addCard(this.state.deck, new Card("",""))
          }, () => {  //await new card before editing it
            this.setState({editingCardIndex: this.state.deck.cards.length-1}, () => {
              //await index being set before getting card
              this.setState({editingCard: this.state.deck.cards[this.state.editingCardIndex]}, () => {
                //await editing card being set before trying to edit it
                this.setState({showEditModal: true});
              });
            });            
          });
          break;
        }
      }
    }

  handleCardlistEvent = (type: string, index: number) => {
    if (this.state.showEditModal) return //Don't acknowledge button clicks if modal is open & covering
    switch (type) {

      case "remove":
        const before = this.state.deck.cards.slice(0, index);
        const after = this.state.deck.cards.slice(index+1);
        let newDeck = this.state.deck;
        newDeck.cards = [...before, ...after];
        this.setState({
          deck: newDeck,
        });
        break;

      case "edit":
        this.setState({editingCard: this.state.deck.cards[index]});
        this.setState({editingCardIndex: index});
        this.setState({showEditModal: true});
        break;
    }
  }

  handleModalEvent = (type: string, card: Card) => {
    switch (type) {
      case "edit":
        let newDeck = this.state.deck;
        newDeck.cards[this.state.editingCardIndex] = card;
        this.setState({deck: newDeck});
        this.setState({showEditModal: false});
        break;
    }
  }

  handleQuizEvent = (type: string, index: number) => {
    const newDeck = this.state.deck;

    switch (type) {
      case "again":
        newDeck.cards[index].ease = 1.0;
        this.setState({deck: newDeck});
        break;
      case "correct":
        newDeck.cards[index].dueDate.setDate(newDeck.cards[index].dueDate.getDate() + newDeck.cards[index].ease);
        newDeck.cards[index].ease = newDeck.cards[index].ease + 1;
        this.setState({deck: newDeck});
        break;
      case "show":
        this.setState({showAnswer: true});
        break;
    }

    if ((type === "again") || (type === "correct")) {

      this.setState({showAnswer: false});

      if (this.state.deck.cards.filter((card) => {return (card.dueDate < new Date())}).length === 0) {
          this.setState({atEndOfDeck: true});
          return;
      }
      
      //to-do card still exists; iterate forward until you find it
      const checkNextCard = () => {
        this.setState({currentQuizIndex: ((this.state.currentQuizIndex+1) % (this.state.deck.cards.length))}, () => {
          if (this.state.deck.cards[this.state.currentQuizIndex].dueDate >= new Date()) {
              checkNextCard();
          }
        }
      )}
      
      checkNextCard();

    }
    }


  render = () => {
    return (
      <main className="main">

          <div className="menu">
            <Menu inQuiz={this.state.inQuiz} clickHandler={this.handleMenuEvent}/>
          </div>
          <div className = "game">
            {
              this.state.inQuiz ? (
                <div className = "quiz">
                  <Quiz deck={this.state.deck} eventHandler={this.handleQuizEvent} currentIndex={this.state.currentQuizIndex} showAnswer={this.state.showAnswer} atEndOfDeck={this.state.atEndOfDeck}/>
                </div>
              ) : (
                <div className = "cardlist">
                  <Cardlist deck={this.state.deck} clickHandler={this.handleCardlistEvent} showEditModal={this.state.showEditModal} selectedIndex={this.state.editingCardIndex}/>
                </div>
              )
            }
          </div>

          <div className="modal">
          {this.state.showEditModal ? (<EditModal eventHandler={this.handleModalEvent} editingCard={this.state.editingCard}/>) : (<></>)}
          </div>

        </main>
    );
  }
}

export default App;
