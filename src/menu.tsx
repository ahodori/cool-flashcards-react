import React from "react";
import PropTypes from "prop-types";
import "./menu.css";

type Props = {
    inQuiz: boolean;
    clickHandler: (s: string) => void;
}

class Menu extends React.Component<Props> {

    handleClick = (type: string) => {
        this.props.clickHandler(type);
    }

    render = () => {
    return (
            <div>
                <button onClick={() => this.handleClick("import")}>Import Deck</button>
                <button onClick={() => this.handleClick("export")}>Export Deck</button>
                <button onClick={() => this.handleClick("add")}>Add Card to Deck</button>
                {this.props.inQuiz ? <button onClick={() => this.handleClick("endquiz")}>Return to Edit Screen</button>
                                   : <button onClick={() => this.handleClick("startquiz")}>Start Quizzing</button>}

            </div>
        )
    }
}

export default Menu;