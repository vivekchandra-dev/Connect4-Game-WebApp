import React from 'react';

import '../Game.css';

const GameCircles = ({ id, children, className, onCircleClicked, isWinning }) => {
    return (
        <div
            className={`gameCircles ${className} ${isWinning ? 'winning' : ''}`}
            onClick={() => onCircleClicked(id)}
        >
            {children}
        </div>
    );
};

export default GameCircles;
