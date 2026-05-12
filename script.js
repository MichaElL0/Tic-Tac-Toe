const Gameboard = (() => {
    const gameboard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const winningCombinations = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal top-left to bottom-right
        [2, 4, 6], // diagonal top-right to bottom-left
    ];

    const placeMarker = (index, mark) => {
        if(gameboard[index] === "") {
            gameboard[index] = mark;
            return true;
        }
        else {
            console.log("Spot is already taken, choose another spot");
            return false;
        }
    }

    const getTheBoard = () => {
        return gameboard;
    }

    const checkWinner = (mark) => {
        return winningCombinations.some(x => {
            return x.every(index => gameboard[index] === mark);
        });
    }

    const checkTie = () => {
        return gameboard.every(x => x !== "");
    }

    const resetBoard = () => {
        gameboard.forEach((x, index) => gameboard[index] = "");
    };

    return { placeMarker, checkWinner, checkTie, getTheBoard, resetBoard };
})();

const createPlayer = (name, mark) => {
    return {
        name: name,
        mark: mark
    };
}

const GameController = (() => {
    let player1 = createPlayer("Player 1", "X");
    let player2 = createPlayer("Player 2", "O");

    let currentPlayer = player1;
    let winner = null;
    let tie = false;

    const getWinner = () => winner;
    const getTie = () => tie;

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const playRound = (index) => {
        if(winner || tie) return;
        
        if(!Gameboard.placeMarker(index, currentPlayer.mark)) return;

        if(Gameboard.checkWinner(currentPlayer.mark)) {
            winner = currentPlayer.name;

            return;
        }
        else if(Gameboard.checkTie()) {
            tie = true;

            return;
        }
        else {
            switchPlayerTurn();
        }

    }

    const resetGame = () => {
        Gameboard.resetBoard();
        winner = null;
        tie = false;
        currentPlayer = player1;
    };

    const startGame = (name1, name2) => {
        player1 = createPlayer(name1, "X");
        player2 = createPlayer(name2, "O");
        resetGame();
    }

    return { getCurrentPlayer, playRound, getWinner, getTie, resetGame, startGame };
})();


const DisplayController = (() => {
    const board = document.querySelector("#board");
    const result = document.querySelector("#result");
    const reset = document.querySelector("#reset");
    const status = document.querySelector("#status");
    const start = document.querySelector("#start");

    const renderBoard = () => {
        board.textContent = "";
        const currentBoard = Gameboard.getTheBoard();
        for (let i = 0; i < 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square")
            square.dataset.index = i;
            square.textContent = currentBoard[i];
            board.appendChild(square);
        };

        const squares = document.querySelectorAll(".square")
        squares.forEach(x => {
            x.addEventListener("click", e => {
                GameController.playRound(+e.target.dataset.index);
                renderBoard();
                renderCurrentPlayer();
                if(GameController.getWinner()) {
                    result.textContent = `${GameController.getWinner()} has won the game!`;
                    return;
                }
                if(GameController.getTie()) {
                    result.textContent = "The game is a tie!";
                    return;
                }
            });
        })
    }

    start.addEventListener("click", e => {
        const name1 = prompt("Enter Player 1 name:") || "Player 1";
        const name2 = prompt("Enter Player 2 name:") || "Player 2";
        GameController.startGame(name1, name2);
        result.textContent = "";
        renderBoard();
        renderCurrentPlayer();
    });

    reset.addEventListener("click", e => {
        GameController.resetGame();
        result.textContent = "";
        renderBoard();
        renderCurrentPlayer();
    });

    const renderCurrentPlayer = () => {
        status.textContent = "It's " + GameController.getCurrentPlayer().name + "'s turn.";
    };
    

    return { renderBoard, renderCurrentPlayer }
})();


DisplayController.renderCurrentPlayer();
DisplayController.renderBoard();




