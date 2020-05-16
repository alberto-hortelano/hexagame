import { Character } from "./Character";
import { Obstacle, SerializableObstacle } from "./Obstacle";
import { Coords, Board } from "./Board";

export interface SerializableCell {
	x: number;
	y: number;
	selected?: boolean;
	step?: number;
	movementCost?: number;
	obstacle?: SerializableObstacle;
}

export class Cell implements Coords {
	#x: SerializableCell['x'];
	#y: SerializableCell['y'];
	#selected: SerializableCell['selected'];
	#step: SerializableCell['step'];
	#movementCost: SerializableCell['movementCost'];
	#obstacle: Obstacle;
	#character: Character;
	#board: Board;

	constructor(cell: SerializableCell, board: Board) {
		this.#x = cell.x;
		this.#y = cell.y;
		this.#selected = cell.selected || false;
		this.#step = cell.step;
		this.#movementCost = cell.movementCost || 1;
		this.#board = board;
		if (cell.obstacle) {
			this.#obstacle = new Obstacle(cell.obstacle);
		}
		board.cells[this.#y][this.#x] = this;
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get selected() {
		return this.#selected;
	}
	get movementCost() {
		return this.#movementCost;
	}
	get step() {
		return this.#step;
	}
	set step(step: number) {
		this.#step = step;
	}
	get obstacle() {
		return this.#obstacle;
	}
	set obstacle(obstacle: Obstacle) {
		this.#obstacle = obstacle;
	}
	get character() {
		return this.#character;
	}
	set character(character: Character) {
		if (this.#character) {
			return; // Cell is already occupied
		}
		if (character.position) { // remove character from previous position
			character.position.removeCharacter();
		}
		this.#character = character;
		this.#character.position = this;
	}
	select() {
		if (this !== this.#board.selectedCell) {
			if (this.#board.selectedCell.character && this.step) { // Previous Cell had a Character
				this.#board.selectedCell.character.doAction(this);
			} else if (this.character) {
				this.#board.removeSteps();
				this.#board.calculateCharacterMovement(this.character);
			} else {
				this.#board.removeSteps();
			}
			this.#board.selectedCell?.deSelect();
			this.#selected = true;
			this.#board.selectedCell = this;
		} else {
			this.#selected = true;
		}
	}
	deSelect() {
		this.#selected = false;
		if (this === this.#board.selectedCell) {
			this.#board.selectedCell = null;
		}
	}
	removeCharacter() {
		this.#character = null;
	}
	toJSON(): SerializableCell {
		return {
			x: this.#x,
			y: this.#y,
			selected: this.#selected,
			step: this.#step,
			movementCost: this.#movementCost,
			obstacle: this.#obstacle?.toJSON(),
		}
	}
}
