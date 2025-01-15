function Gameboard() {
	const board = Array(9).fill(null);

	const getBoard = () => board;

	return { getBoard };
}

function Player(playerName, symbol) {
	return { playerName, symbol };
}
