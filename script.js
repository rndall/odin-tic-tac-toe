const Gameboard = (() => {
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

	const checkWinner = () => {
		const win = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const w of win) {
			const [a, b, c] = w;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}
		return null;
	};

	const checkForTie = () => !board.filter((cell) => cell === null).length;

	return { getBoard, markSquare, printBoard, checkWinner, checkForTie };
})();

function Player(name, symbol) {
	return { name, symbol };
}

const GameController = ((
	playerOneName = "Player One",
	playerTwoName = "Player Two",
) => {
	const board = Gameboard;

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

	const displayWinner = (playerName) => {
		if (playerName) {
			console.log(`${playerName} wins!`);
		} else {
			console.log("It's a tie.");
		}
	};

	const playRound = (squareIndex) => {
		board.markSquare(squareIndex, getActivePlayer().symbol);

		const winner = board.checkWinner();
		if (winner) {
			if (!getActivePlayer().symbol === winner) {
				switchPlayerTurn();
			}

			board.printBoard();
			displayWinner(getActivePlayer().name);
			return;
		}

		if (board.checkForTie()) {
			board.printBoard();
			displayWinner();
			return;
		}

		switchPlayerTurn();
		printNewRound();
	};

	printNewRound();

	return { playRound, getActivePlayer, getBoard: board.getBoard };
})();

const DisplayController = (() => {
	const game = GameController;
	const playerTurnEl = document.querySelector("#turn");
	const boardCellsEl = document.querySelectorAll(".board__cell");

	const updateScreen = () => {
		// Clear board
		for (const cellEl of boardCellsEl) {
			cellEl.textContent = "";
		}

		const board = game.getBoard();
		const activePlayer = game.getActivePlayer();

		playerTurnEl.textContent = `${activePlayer.name}'s turn...`;

		// Display squares
		for (let i = 0; i < board.length; i++) {
			boardCellsEl[i].textContent = board[i];
		}
	};

	updateScreen();
})();
