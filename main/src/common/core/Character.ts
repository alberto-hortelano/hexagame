import { Cell } from "./Cell";

export interface SerializableCharacter { // Serializable properties. 
	name: string;
	movement: number;
}

export class Character {
	#name: SerializableCharacter['name'];
	#movement: SerializableCharacter['movement'];
	#movementLeft: SerializableCharacter['movement'];
	#position: Cell;

	constructor(character: SerializableCharacter, position?: Cell) {
		this.#name = character.name;
		this.#movement = character.movement;
		this.#movementLeft = character.movement;
		this.#position = position;
	}
	get name() {
		return this.#name;
	}
	get movement() {
		return this.#movement;
	}
	get movementLeft() {
		return this.#movementLeft;
	}
	get position() {
		return this.#position;
	}
	set position(position: Cell) {
		if (position.character !== this) { // Its not being set by Cell.character
			position.character = this; // Let Cell.character handle position setting
		} else { // Its being set by Cell.character
			this.#position = position;
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
}
const cells = {
	[0]: {
		[2]: 'cell 2-0'
	},
	[4]: {
		[1]: 'ceel 1-4',
		[5]: 'cell 5-1'
	}
}