import { Character } from "./Character";


export interface SerializablePlayer {
	name: string;
}

export class Player {
	#name: SerializablePlayer['name'];
	#characters: Character[];

	constructor(player: SerializablePlayer) {
		this.#name = player.name;
	}
	get name() {
		return this.#name;
	}
}
