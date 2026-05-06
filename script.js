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

    const checkWinner = (mark) => {
        return winningCombinations.some(x => {
            return x.every(index => gameboard[index] === mark);
        });
    }

    const checkTie = () => {
        return gameboard.every(x => x !== "");
    }

    return { placeMarker, showTheBoard, checkWinner, checkTie };
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

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => currentPlayer;

    const playRound = (index) => {
        Gameboard.showTheBoard();
        
        if(!Gameboard.placeMarker(index, currentPlayer.mark)) return;

        if(Gameboard.checkWinner(currentPlayer.mark)) {
            console.log(`${currentPlayer.name} has won the game`);
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

    return { getCurrentPlayer, playRound };
})();

GameController.playRound(1);
GameController.playRound(1);
GameController.playRound(4);
GameController.playRound(7);
GameController.playRound(2);
GameController.playRound(6);
GameController.playRound(8);
GameController.playRound(5);
GameController.playRound(3);
GameController.playRound(0);


