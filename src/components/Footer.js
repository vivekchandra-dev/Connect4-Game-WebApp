import React from "react";

const Footer = ({onNewGameClickEvent, onSuggestClick}) => {
    return (
        <div className="panel footer">
            <button onClick={onNewGameClickEvent}>NEW GAME</button>
            <button onClick={onSuggestClick}>SUGGEST</button>
        </div>
    );
};

export default Footer;