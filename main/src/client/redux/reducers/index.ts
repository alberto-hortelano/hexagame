import { Reducer } from "redux";
import { Game, SerializableGame } from "core/Game";
import { setAction, selectCell } from "../actions";

type Actions = ReturnType<typeof setAction | typeof selectCell>

export const initStore = (initalState: SerializableGame): Reducer<SerializableGame> => (state = initalState, action: Actions) => {
	const game = new Game(state);
	console.log("log: game", game);
	switch (action.type) {
		case 'setAction':
			game.action = action.payload.action;
			return game.toJSON();
		case 'selectCell':
			const { x, y } = action.payload.selectedCell;
			const cell = game.board.getCell({ x, y });
			if (!cell) {
				console.error(`Error selecting cell: ${x}-${y}`);
				return state;
			}
			game.board.selectedCell = cell;
			console.log("log: selectCell", game.toJSON(), game.board.selectedCell);
			return game.toJSON();
		default:
			return state;
	}
}
