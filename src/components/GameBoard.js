import React, { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import '../Game.css';


import Header from "./Header";
import Footer from "./Footer";
import GameCircles from "./GameCircles";

import { isDraw, getWinningLine, getComputerMove } from "../helper";

import { GAME_STATE_PLAYING, NOPLAYER, PLAYER1, PLAYER2, GAME_STATE_WIN, GAME_STATE_DRAW } from "../Constant";

const Gameboard = () => {
    const { width, height } = useWindowSize();
    const [gameBoard, setGameBoard] = useState(Array(16).fill(NOPLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winningCells, setWinningCells] = useState([]);
    const [gameMode, setGameMode] = useState('twoPlayers');
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        initGame();
    }, []);

    //computer's turn
    useEffect(() => {
        if (
            gameMode === 'vsComputer' &&
            currentPlayer === PLAYER2 &&
            gameState === GAME_STATE_PLAYING
        ) {
            const timer = setTimeout(() => {
                suggestMove();
            }, 500); 

            return () => clearTimeout(timer);
        }
    }, [currentPlayer, gameState, gameMode]);

    const initGame = () => {
        console.log('init game');
        setGameBoard(Array(16).fill(NOPLAYER));
        setCurrentPlayer(PLAYER1);
        setGameState(GAME_STATE_PLAYING);
        setWinningCells([]);
    }

    const suggestMove = () => {
        if (gameState === GAME_STATE_PLAYING) {
            const move = getComputerMove(gameBoard, PLAYER2, PLAYER1);
            if (move !== null && gameBoard[move] === NOPLAYER) {
                circleClicked(move);
            }
        }
    }
    
    const circleClicked = (id) => {
        if (gameState !== GAME_STATE_PLAYING || gameBoard[id] !== NOPLAYER) {
            return;
        }

        const newGameBoard = [...gameBoard];
        newGameBoard[id] = currentPlayer;
        setGameBoard(newGameBoard);

        const winningLine = getWinningLine(newGameBoard);
        if (winningLine.length > 0) {
            console.log(`Player ${currentPlayer} wins!`);
            setGameState(GAME_STATE_WIN);
            setWinningCells(winningLine);
            return;
        }

        if (isDraw(newGameBoard)) {
            console.log('Game is a draw!');
            setGameState(GAME_STATE_DRAW);
            return;
        }

        setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
    };

    const renderCircle = (id) => {
        const isWinningCell = winningCells.includes(id);
        return (
            <GameCircles
                key={id}
                id={id}
                className={`player${gameBoard[id]}${isWinningCell ? ' winning' : ''}`}
                onCircleClicked={() => circleClicked(id)}
            >
                {`Circle ${id}`}
            </GameCircles>
        );
    };

return (
  <>
    <div className="mode-selection">
      <button 
        onClick={() => { setGameMode('twoPlayers'); initGame(); }} 
        disabled={gameMode === 'twoPlayers'}
        style={{marginRight: '10px', padding: '10px 20px'}}
      >
        Two Players
      </button>

      <button 
        onClick={() => { setGameMode('vsComputer'); initGame(); }} 
        disabled={gameMode === 'vsComputer'}
        style={{padding: '10px 20px'}}
      >
        Vs Computer
      </button>
    </div>

    {gameState === GAME_STATE_WIN && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <Confetti width={width} height={height} />
      </div>
    )}

    <Header gameState={gameState} player={currentPlayer} />
    <div className="gameBoard">
      {Array.from({ length: 16 }, (_, id) => renderCircle(id))}
    </div>
    <Footer onNewGameClickEvent={initGame} onSuggestClick={suggestMove} />
  </>
);
};

export default Gameboard;
