import React, { useEffect, useState } from "react";

import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN } from "../Constant";

const Header = ({ gameState, player }) => {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        setFade(true);
        const timeout = setTimeout(() => setFade(false), 500);
        return () => clearTimeout(timeout);
    }, [gameState, player]);

    const renderLabel = () => {
        switch (gameState) {
            case GAME_STATE_PLAYING:
                return <div> Player {player} Turn </div>;
            case GAME_STATE_WIN:
                return <div> Player {player} Wins </div>;
            case GAME_STATE_DRAW:
                return <div> Game is a Draw </div>;
            default:
                return null;
        }
    };

    return (
        <div className="panel header">
            <div className={`header-text ${fade ? "fade-out" : ""}`}>
                {renderLabel()}
            </div>
        </div>
    );
};

export default Header;
