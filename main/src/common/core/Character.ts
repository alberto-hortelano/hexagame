import { Cell } from "./Cell";
import { Coords, Board } from "./Board";

export interface SerializableCharacter { // Serializable properties. 
	index?: number;
	name: string;
	team: string;
	movement: number;
	movementLeft?: number;
	position?: Coords;
	path?: Coords[];
}

export class Character {
	#index: SerializableCharacter['index'];
	#name: SerializableCharacter['name'];
	#team: SerializableCharacter['team'];
	#movement: SerializableCharacter['movement'];
	#movementLeft: SerializableCharacter['movementLeft'];
	#position: Cell;
	#board: Board;
	#path: Cell[];

	constructor(character: SerializableCharacter, board: Board) {
		this.#index = character.index;
		this.#name = character.name;
		this.#team = character.team;
		this.#movement = character.movement;
		this.#movementLeft = character.movementLeft === void 0 ? character.movement : character.movementLeft;
		if (character.position) {
			this.position = board.getCell(character.position);
		}
		if (character.path) {
			this.#path = character.path.map(coord => board.getCell(coord));
		}
		this.#board = board;
	}
	get index() {
		return this.#index;
	}
	set index(index) {
		this.#index = index;
	}
	get name() {
		return this.#name;
	}
	set name(name) {
		this.#name = name;
	}
	get team() {
		return this.#team;
	}
	get movement() {
		return this.#movement;
	}
	get movementLeft() {
		return this.#movementLeft;
	}
	set movementLeft(movementLeft) {
		this.#movementLeft = movementLeft;
	}
	get position() {
		return this.#position;
	}
	set position(position: Cell) {
		if (position.character !== this) { // It's not being set by Cell.character
			position.character = this; // Let Cell.character handle position setting
		} else { // Its being set by Cell.character
			this.#position = position;
		}
	}
	get path() {
		return this.#path;
	}
	calculatePath(target: Cell) {
		const path = [];
		let cell = target;
		let step = cell.step;
		while (step > 0) {
			path.push(cell);
			const coords = this.#board.getAdjacentCells(cell).find(coords => {
				const cell = this.#board.getCell(coords);
				return cell.step != null && cell.step < step
			});
			cell = this.#board.getCell(coords);
			step = cell.step;
		}
		this.#path = path.reverse();
	}
	move(target: Cell) {
		this.#path = [];
		this.#movementLeft -= target.step;
		this.#board.removeSteps();
		this.position = target;
		this.#board.calculateCharacterMovement(this);
	}
	doAction(target: Cell) {
		if (target.character && target.character.team !== this.team) { // Attack
			console.log('attack? range....')
		} else if (!target.character && !target.obstacle && target.step) { // Move
			console.log('Moooove!!!')
			this.calculatePath(target);
		}
	}
	/**
	 * Get the amount of movement needed to leave given cell
	 */
	calculateCellMovementCost(cell: Cell, adjacentCells: Cell[]) {
		let movementCost = cell.movementCost;
		for (const key in adjacentCells) {

		}
		return movementCost;
	}
	toJSON(): SerializableCharacter {
		const { x, y } = this.#position;
		return {
			index: this.#index,
			name: this.#name,
			team: this.#team,
			movement: this.#movement,
			movementLeft: this.#movementLeft,
			position: { x, y },
			path: this.#path?.map(({ x, y }) => ({ x, y })),
		}
	}
}
