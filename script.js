function Gameboard() {
	const board = Array(9).fill(null);

	const getBoard = () => board;

	const markSquare = (squareIndex, symbol) => {
		if (board[squareIndex]) return;

		board[squareIndex] = symbol;
	};

	const printBoard = () => {
		let consoleBoard = "";
		for (let i = 0; i < board.length; i++) {
			consoleBoard += `${board[i] === null ? "_" : board[i]} `;

			if ((i + 1) % 3 === 0 && i !== board.length - 1) {
				consoleBoard += "\n";
			}
		}
		console.log(consoleBoard);
	};

	return { getBoard, markSquare, printBoard };
}

function Player(name, symbol) {
	return { name, symbol };
}

const GameController = ((
	playerOneName = "Player One",
	playerTwoName = "Player Two",
) => {
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

	const playRound = (squareIndex) => {
		board.markSquare(squareIndex, getActivePlayer().symbol);

		switchPlayerTurn();
		printNewRound();
	};

	printNewRound();

	return { playRound };
})();
