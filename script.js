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

    const showTheBoard = () => {
        console.log("Current board is:");
        console.log(gameboard.slice(0, 3));
        console.log(gameboard.slice(3, 6));
        console.log(gameboard.slice(6, 9));
        console.log("--------------------");
        console.log("");
    };

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

    return { placeMarker, showTheBoard, checkWinner, checkTie, getTheBoard };
})();

const createPlayer = (name, mark) => {
    return {
        name: name,
        mark: mark,
        sayInfo() {
            console.log(`My name is ${name} and my mark is ${mark}`);
        }
    };
}

const GameController = (() => {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");

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
        Gameboard.showTheBoard();
        
        if(!Gameboard.placeMarker(index, currentPlayer.mark)) return;

        if(Gameboard.checkWinner(currentPlayer.mark)) {
            winner = currentPlayer.name;
            console.log(`${winner} has won the game`);
            Gameboard.showTheBoard();
            return;
        }
        else if(Gameboard.checkTie()) {
            console.log("There is a TIE!");
            Gameboard.showTheBoard();
            return;
        }
        else {
            switchPlayerTurn();
        }
        Gameboard.showTheBoard();

    }

    return { getCurrentPlayer, playRound, getWinner, getTie };
})();


const DisplayController = (() => {
    const board = document.querySelector("#board");

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
                    const result = document.querySelector("#result");
                    result.textContent = `${GameController.getWinner()} has won the game!`;
                    return;
                }
                if(GameController.getTie()) {
                    const result = document.querySelector("#result");
                    result.textContent = "The game is a tie!";
                    return;
                }
            });
        })
    }

    const renderCurrentPlayer = () => {
        const status = document.querySelector("#status");

        status.textContent = "Current player is: " + GameController.getCurrentPlayer().name;
    };
    

    return { renderBoard, renderCurrentPlayer }
})();


DisplayController.renderCurrentPlayer();
DisplayController.renderBoard();




