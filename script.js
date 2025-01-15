function Gameboard() {
	const board = Array(9).fill(null);

	const getBoard = () => board;

	return { getBoard };
}

function Player(playerName, symbol) {
	return { playerName, symbol };
}

function GameController(
	playerOneName = "Player One",
	playerTwoName = "Player Two",
) {
	const board = Gameboard();

	const players = [Player(playerOneName, "X"), Player(playerTwoName, "O")];

	let activePlayer = players[0];
	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};
}
