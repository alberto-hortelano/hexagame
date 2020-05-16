import { Game, SerializableGame } from "core/Game";
import { getDeepProxy } from "../../../common/lib/helpers";

// TODO: Remove this and query the DB for real games
export const exampleGames: { [key: string]: SerializableGame } = {
	demo: {
		board: {
			width: 10,
			heigth: 10,
			selectedCell: { x: 1, y: 3 },
			characters: [
				{
					name: 'one',
					team: 'player',
					movement: 6,
					position: { x: 1, y: 4 }
				},
				{
					name: 'two',
					team: 'player',
					movement: 7,
					position: { x: 1, y: 6 }
				}
			]
		},
	},
	loggedInGame: {
		board: {
			width: 5,
			heigth: 5,
		}
	},
	newRegisterGame: {
		board: {
			width: 5,
			heigth: 5,
		}
	},
};

const allSetters: { [k: string]: React.Dispatch<React.SetStateAction<any>>[] } = {};

let gameProxy: Game;
let game: Game;

export const getGame = (setters?: { [k: string]: React.Dispatch<React.SetStateAction<any>> }) => {
	Object.keys(setters).forEach(k => {
		if (allSetters[k]) {
			allSetters[k].push(setters[k]);
		} else {
			allSetters[k] = [setters[k]];
		}
	});
	return game;
}

export const loadGame = async (gameId?: string) => {
	console.log("log: loadGame");
	if (gameProxy) {
		throw "Game already loaded";
	}
	const gameData = await new Promise(resolve => setTimeout(() => {
		// In the server:
		// get the game by Id from database
		resolve(exampleGames[gameId]);
	}, 0));
	console.log("log: loadGame -> gameData", gameData);
	if (gameProxy) {
		throw "Game already loaded";
	}
	game = new Game(gameData);
	console.log("log: loadGame -> game", game);
	game.board.selectedCell = game.board.cells[0][3];
	gameProxy = getDeepProxy(game);
}
