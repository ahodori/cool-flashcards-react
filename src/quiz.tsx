import React from "react";
import PropTypes from "prop-types";
import {Card, Deck, addCard} from "./card"

type Props = {
    eventHandler: (s: string, c: number) => void;
    deck: Deck;
    currentIndex: number;
    showAnswer: boolean;
    atEndOfDeck: boolean;
}

type State = {
    
}



class Quiz extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        /*this.state = {
            currentIndex: 0,
            showAnswer: false,
            atEndOfDeck: false,
        }*/
    }


    handleClick = (type: string, index: number) => {
        this.props.eventHandler(type, index);
    }


    render = () => {
    return (
            <div>
                {!this.props.atEndOfDeck ? (
                    <>
                    <div className="cardFront">
                        {this.props.deck.cards[this.props.currentIndex].front.text}
                    </div>
                    {!this.props.showAnswer ? (
                        <button onClick={()=>this.handleClick("show", this.props.currentIndex)}>Show answer</button>
                    ) : (
                        <>
                        <div className="cardBack">
                            {this.props.deck.cards[this.props.currentIndex].back.text}
                        </div>
                        <button onClick={()=>this.handleClick("again", this.props.currentIndex)}>Again</button>
                        <button onClick={()=>this.handleClick("correct", this.props.currentIndex)}>Got it</button>
                        </>
                    )}</>
                ) : (
                    <>End of deck reached!</>
                )}
            </div>
        )
    }
}

export default Quiz;