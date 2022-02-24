import React from "react";
import PropTypes from "prop-types";
import {Card, Deck, addCard} from "./card"

type Props = {
    eventHandler: (s: string, c: Card) => void;
    editingCard: Card;
}

type State = {
    frontValue: string;
    backValue: string;
}

class EditModal extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {frontValue: '', backValue: ''}
    }

    componentDidMount() {
        this.setState({frontValue: this.props.editingCard.front.text, backValue: this.props.editingCard.back.text});
    }

    handleClick = (type: string) => {  //todo: click outside of modal to cancel
        //this.props.eventHandler(type);
    }



    handleSubmit = (event: { preventDefault: () => void; }) => { //the most epic hack in the world, check with hug
        this.props.eventHandler("edit", new Card(this.state.frontValue,this.state.backValue));
        event.preventDefault();
    }

    render = () => {
    return (
            <div>
                <textarea value={this.state.frontValue} onChange={(event) => {this.setState({frontValue: event.target.value})}}></textarea>
                <textarea value={this.state.backValue} onChange={(event) => {this.setState({backValue: event.target.value})}}></textarea>
                <button onClick={this.handleSubmit}>save</button>
            </div>
        )
    }
}

export default EditModal;