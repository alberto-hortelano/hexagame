import { Cell } from "./Cell";


export interface SerializableObstacle { // Serializable properties. 
	name: string;
}

export class Obstacle {
	#name: SerializableObstacle['name'];
	#position: Cell;

	constructor(obstacle: SerializableObstacle, position?: Cell) {
		this.#name = obstacle.name;
		this.#position = position;
	}
	get name() {
		return this.#name;
	}
	get position() {
		return this.#position;
	}
	set position(position: Cell) {
		if (this.#position) {
			this.#position.character = null;
		}
		this.#position = position;
		this.#position.obstacle = this;
	}
	toJSON(): SerializableObstacle {
		return {
			name: this.#name,
		}
	}
}

