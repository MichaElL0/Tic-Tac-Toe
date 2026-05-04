const Gameboard = (() => {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    return { };
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

    return { };
})();
