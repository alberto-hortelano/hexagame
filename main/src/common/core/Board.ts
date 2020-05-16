import { SerializableCell, Cell } from "./Cell";
import { getCellsInRadius, isCellOffBounds, bounds, getAdjacentCells, calculateMovement, print } from "../lib/board";
import { Character, SerializableCharacter } from "./Character";

export interface SerializableBoard { // Serializable properties. 
	width: number;
	heigth: number;
	selectedCell?: Coords;
	cells?: SerializableCell[][];
	characters?: SerializableCharacter[];
	stepsDisplayed?: boolean;
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
	#characters: Character[];
	#stepsDisplayed: SerializableBoard['stepsDisplayed'] = false;

	constructor(board: SerializableBoard) {
		this.#width = board.width;
		this.#heigth = board.heigth;
		this.#stepsDisplayed = board.stepsDisplayed;
		this.#cells = [];
		this.#characters = [];
		let y = 0;
		while (y < this.#heigth) {
			this.#cells[y] = [];
			let x = 0;
			while (x < this.#width) {
				const cell = board.cells?.[y]?.[x] || { x, y };
				new Cell(cell, this);
				x++;
			}
			y++;
		}
		if (board.characters) {
			board.characters.forEach((serializableCharacter, index) => {
				serializableCharacter.index = index;
				const character = new Character(serializableCharacter, this);
				this.#characters.push(character);
			})
		}
		if (board.selectedCell) {
			const { x, y } = board.selectedCell;
			this.#selectedCell = this.#cells[y]?.[x];
			this.#selectedCell.select();
		}
	}
	get width() {
		return this.#width;
	}
	get heigth() {
		return this.#heigth;
	}
	get cells() {
		return this.#cells;
	}
	get characters() {
		return this.#characters;
	}
	get selectedCell() {
		return this.#selectedCell;
	}
	set selectedCell(cell: Cell) {
		if (cell) {
			if (cell.selected) {
				this.#selectedCell = cell;
			} else {
				cell.select();
			}
		} else {
			this.#selectedCell = null;
		}
	}

	getCell({ x, y }: SerializableCell) {
		return this.#cells?.[y]?.[x];
	}

	newCell(cell: SerializableCell) {
		const newCell = new Cell(cell, this);
		return newCell;
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
		const steps = calculateMovement(character, this.#cells);
		steps.forEach((step, cell) => {
			cell.step = step;
		});
		this.#stepsDisplayed = true;
		return steps;
	}

	removeSteps() {
		if (this.#stepsDisplayed) {
			this.#cells?.forEach(row => row.forEach(cell => cell.step = null));
			this.#stepsDisplayed = false;
		}
	}

	getAdjacentCells(cell: Cell) {
		return getAdjacentCells(cell, this.getBounds());
	}

	toJSON(): SerializableBoard {
		return {
			width: this.#width,
			heigth: this.#heigth,
			selectedCell: this.#selectedCell?.toJSON(),
			cells: this.#cells.map(row => row.map(cell => cell.toJSON())),
			characters: this.#characters?.map(character => character.toJSON()),
			stepsDisplayed: this.#stepsDisplayed,
		}
	}
	// FOR TESTING ONLY
	print(colored = false) {
		const txt = print(this.#width, this.#heigth, this.#cells, colored);
		// console.log(txt);
		return txt;
	}
}
