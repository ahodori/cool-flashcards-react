import React from "react";
import PropTypes from "prop-types";
import {Card, Deck, addCard} from "./card"
import "./cardlist.css";

type Props = {
    deck: Deck;
    clickHandler: (s: string, c: number) => void;
    showEditModal: boolean;
    selectedIndex: number;
}

type State = {

}

class Cardlist extends React.Component<Props, State> {

    displayList = <></>;

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        }
    }

    handleClick = (type: string, index: number) => {
        this.props.clickHandler(type, index);
    }

    convertToTable = () => {
        const listItems = this.props.deck.cards.map((card, index) => {
            return (<>
                        <tr className={(this.props.showEditModal && index===this.props.selectedIndex) ? "highlightedRow" : ""}>
                            <td>{card.front.text}</td>
                            <td>{card.back.text}</td>
                            <td>{(card.dueDate.getTime() < Date.now() ? "Now" : card.dueDate.toDateString())}</td>
                            <td><button onClick={() => this.handleClick("edit", index)}>✏️</button>
                                <button onClick={() => this.handleClick("remove", index)}>🗑️</button></td>
                        </tr>
                    </>)
        })
        return (<>{listItems}</>)
    }

    render = () => {
    return (
            <div>
                <table>
                    <tr>
                        <td>Card Front</td>
                        <td>Card Back</td>
                        <td>Card Due Date</td>
                    </tr>
                    {this.convertToTable()}
                </table>
            </div>
        )
    }
}

export default Cardlist;