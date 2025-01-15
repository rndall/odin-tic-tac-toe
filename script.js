function Gameboard() {
	const board = Array(9).fill(null);

	const getBoard = () => board;

	const printBoard = () => {
		let consoleBoard = "";
		for (let i = 0; i < board.length; i++) {
			consoleBoard += `${board[i]} `;

			if ((i + 1) % 3 === 0 && i !== board.length - 1) {
				consoleBoard += "\n";
			}
		}
		console.log(consoleBoard);
	};

	return { getBoard, printBoard };
}

function Player(name, symbol) {
	return { name, symbol };
}

(function GameController(
	playerOneName = "Player One",
	playerTwoName = "Player Two",
) {
	const board = Gameboard();

	const players = [Player(playerOneName, "X"), Player(playerTwoName, "O")];

	let activePlayer = players[0];
	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};
	const getActivePlayer = () => activePlayer;

	const printNewRound = () => {
		board.printBoard();
		console.log(`${getActivePlayer().name}'s turn.`);
	};

	printNewRound();
})();
