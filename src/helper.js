export const getWinningLine = (gameBoard) => {
    const winlines = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ];

    for (let i = 0; i < winlines.length; i++) {
        const [c1, c2, c3, c4] = winlines[i];

        if (gameBoard[c1] > 0 &&
            gameBoard[c1] === gameBoard[c2] &&
            gameBoard[c2] === gameBoard[c3] &&
            gameBoard[c3] === gameBoard[c4]) {
            return [c1, c2, c3, c4];
        }
    }
    return [];
};

export const isDraw = (gameBoard) => {
    return gameBoard.every(cell => cell !== 0);
}

export const getComputerMove = (gameBoard, computerPlayer, humanPlayer) => {
    const getWinningMove = (player) => {
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i] === 0) {
                let newBoard = [...gameBoard];
                newBoard[i] = player;
                if (getWinningLine(newBoard).length > 0) {
                    return i;
                }
            }
        }
        return null;
    };

    let winningMove = getWinningMove(computerPlayer);
    if (winningMove !== null) {
        return winningMove;
    }

    let blockingMove = getWinningMove(humanPlayer);
    if (blockingMove !== null) {
        return blockingMove;
    }

    const center = Math.floor(gameBoard.length / 2);
    if (gameBoard[center] === 0) {
        return center;
    }

    let validMoves = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 0) {
            validMoves.push(i);
        }
    }
    if (validMoves.length === 0) {
        return null;
    }
    let randomMove = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomMove];
};
