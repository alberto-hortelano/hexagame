import { SerializableCell, Cell } from "./Cell";
import { getCellsInRadius, isCellOffBounds, bounds, getAdjacentCells, calculateMovement, print } from "../lib/board";
import { Character } from "./Character";

export interface SerializableBoard { // Serializable properties. 
	width: number;
	heigth: number;
	cells?: SerializableCell[][];
}

export interface Coords {
	x: number;
	y: number;
}

export class Board {
	#width: SerializableBoard['width'];
	#heigth: SerializableBoard['heigth'];
	#cells: Cell[][];
	#selectedCell: Cell;

	constructor(board: SerializableBoard) {
		this.#width = board.width;
		this.#heigth = board.heigth;
		this.#cells = [];
		let y = 0;
		while (y < this.#heigth) {
			this.#cells[y] = [];
			let x = 0;
			while (x < this.#width) {
				const cell = board.cells?.[y]?.[x] || { x, y };
				this.#cells[y][x] = new Cell(cell);
				x++;
			}
			y++;
		}
	}
	get width() {
		return this.#width;
	}
	get heigth() {
		return this.#heigth;
	}
	get selectedCell() {
		return this.#selectedCell;
	}
	set selectedCell(cell: Cell) {
		this.#selectedCell = cell;
	}
	getCell({ x, y }: SerializableCell) {
		return this.#cells?.[y]?.[x];
	}

	getBounds(): bounds {
		return {
			x: {
				from: 0,
				to: this.#width
			},
			y: {
				from: 0,
				to: this.#heigth
			}
		}
	}

	isCellOffBounds(cell: Coords) {
		return isCellOffBounds(cell, this.getBounds());
	}

	getCellsInRadius(cell: Cell, r: number) {
		return getCellsInRadius(cell, r, this.getBounds());
	}

	calculateCharacterMovement(character: Character) {
		return calculateMovement(character, this.#cells);
	}

	getAdjacentCells(cell: Cell) {
		return getAdjacentCells(cell, this.getBounds());
	}

	print(colored = false) {
		const txt = print(this.#width, this.#heigth, this.#cells, colored);
		// console.log(txt);
		return txt;
	}
}
