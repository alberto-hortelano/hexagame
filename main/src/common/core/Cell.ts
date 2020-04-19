import { SerializableCharacter, Character } from "./Character";
import { Obstacle, SerializableObstacle } from "./Obstacle";
import { Coords } from "./Board";

export interface SerializableCell {
	x: number;
	y: number;
	movementCost?: number;
	obstacle?: SerializableObstacle;
	character?: SerializableCharacter;
}

export class Cell implements Coords {
	#x: SerializableCell['x'];
	#y: SerializableCell['y'];
	#movementCost: SerializableCell['movementCost'];
	#obstacle: Obstacle;
	#character: Character;

	constructor(cell: SerializableCell) {
		this.#x = cell.x;
		this.#y = cell.y;
		this.#movementCost = cell.movementCost || 1;
		if (cell.obstacle) {
			this.#obstacle = new Obstacle(cell.obstacle);
		}
		if (cell.character) {
			this.#character = new Character(cell.character);
		}
	}
	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get movementCost() {
		return this.#movementCost;
	}
	get obstacle() {
		return this.#obstacle;
	}
	set obstacle(newObstacle: Obstacle) {
		this.#obstacle = newObstacle;
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
	removeCharacter() {
		this.#character = null;
	}
	toJSON() {
		return {
			x: this.#x,
			y: this.#y
		}
	}
	toString() {
		return 'PIKIIII toString'
	}
	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
		yield this.character;
		yield this.obstacle;
	}
}
