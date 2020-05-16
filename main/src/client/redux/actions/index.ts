import { Coords } from "core/Board";

export const setAction = (action: string) => (<const>{
	type: 'setAction',
	payload: { action }
});

export const selectCell = (selectedCell: Coords) => (<const>{
	type: 'selectCell',
	payload: { selectedCell }
});
