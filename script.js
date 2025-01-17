const Gameboard = (() => {
	const board = Array(9).fill(null);

	const resetBoard = () => {
		for (let i = 0; i < board.length; i++) {
			board[i] = null;
		}
	};
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

	const checkForTie = () => !board.filter((square) => square === null).length;

	return {
		resetBoard,
		getBoard,
		markSquare,
		printBoard,
		checkWinner,
		checkForTie,
	};
})();

function Player(name, symbol) {
	let playerName = name;
	const getName = () => playerName;
	const setName = (newName) => {
		playerName = newName;
	};

	return { getName, setName, symbol };
}

const GameController = ((
	playerOneName = "Player One",
	playerTwoName = "Player Two",
) => {
	const board = Gameboard;

	const players = [Player(playerOneName, "X"), Player(playerTwoName, "O")];
	const setPlayerName = (number, newName) =>
		players[number - 1].setName(newName);

	let winner = null;
	const getWinner = () => winner;
	const resetWinner = () => {
		winner = null;
	};

	let activePlayer = players[0];
	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};
	const setPlayer1 = () => {
		activePlayer = players[0];
	};
	const getActivePlayer = () => activePlayer;

	const printNewRound = () => {
		board.printBoard();
		console.log(`${getActivePlayer().getName()}'s turn.`);
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

		winner = board.checkWinner();
		if (winner) {
			if (!getActivePlayer().symbol === winner) {
				switchPlayerTurn();
			}

			board.printBoard();
			displayWinner(getActivePlayer().getName());
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

	return {
		setPlayerName,
		playRound,
		setPlayer1,
		getActivePlayer,
		resetBoard: board.resetBoard,
		getBoard: board.getBoard,
		resetWinner,
		getWinner,
		checkForTie: board.checkForTie,
	};
})();

const DisplayController = (() => {
	const game = GameController;
	const playerTurnEl = document.querySelector("#turn");
	const boardSquaresEl = document.querySelectorAll(".board__square");
	const dialogEl = document.querySelector(".dialog");
	const form = document.querySelector(".form");
	const restartBtn = document.querySelector("#restart");
	let winner = null;

	const updateScreen = () => {
		// Clear board
		for (const squareEl of boardSquaresEl) {
			squareEl.textContent = "";
		}

		const board = game.getBoard();
		const activePlayer = game.getActivePlayer();

		playerTurnEl.textContent = `${activePlayer.getName()}'s turn (${activePlayer.symbol})`;

		// Display squares
		for (let i = 0; i < board.length; i++) {
			boardSquaresEl[i].textContent = board[i];
		}

		winner = game.getWinner();
		if (winner) {
			playerTurnEl.textContent = `${activePlayer.getName()} has won!`;
			return;
		}

		if (game.checkForTie()) {
			playerTurnEl.textContent = "It's a tie.";
		}
	};

	const handleSquareClick = (e) => {
		const squareEl = e.target;

		if (squareEl.textContent || winner) return;

		game.playRound(squareEl.dataset.index);
		updateScreen();
	};
	for (const squareEl of boardSquaresEl) {
		squareEl.addEventListener("click", handleSquareClick);
	}

	const restartGame = () => {
		game.resetBoard();
		game.setPlayer1();
		game.resetWinner();
		updateScreen();
	};
	restartBtn.addEventListener("click", restartGame);

	dialogEl.showModal();
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const player1Input = document.querySelector("#player_1");
		const player2Input = document.querySelector("#player_2");

		if (player1Input.value.trim() && player2Input.value.trim()) {
			game.setPlayerName(1, player1Input.value.trim());
			game.setPlayerName(2, player2Input.value.trim());
		}

		dialogEl.close();
		updateScreen();
	});
})();
