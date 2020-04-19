/* 
Game mechanics:
	1) The user selects a Cell
	2) If selectedAction is set:
		a) If is a valid Cell to apply selectedAction, apply it
		b) If is not a valid Cell: unset action or do nothing???
	3) If selectedAction is not set:
		a) The Cell has a Player's Character:
			- Sets the Character as selected
			- Show Character's available move
			- Show other Character's actions
		b) The Cell has other Character:
			- Show available information
*/

import { Cell } from "./Cell";
import { SerializableBoard, Board } from "./Board";

export interface SerializableGame { // Serializable properties. 
	board?: SerializableBoard;
}

export class Game {
	#action: string;
	#board: Board;
	#selectedCell: Cell;

	constructor(game: SerializableGame) {
		if (game.board) {
			this.#board = new Board(game.board);
		}
	}
	get board() {
		return this.#board;
	}
	set board(board: Board) {
		this.#board = board;
	}
	get selectedCell() {
		return this.#selectedCell;
	}
	set selectedCell(cell: Cell) {
		this.#selectedCell = cell;
	}
	get action() {
		return this.#action;
	}
	set action(action: string) {
		this.#action = action;
	}


}
