import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit'
import { SerializableGame } from 'core/Game'
import { Board, Coords, SerializableBoard } from 'core/Board';

let max = 10;

const board = createSlice<SerializableGame['board'], SliceCaseReducers<SerializableGame['board']>>({
	name: 'board',
	initialState: {
		width: 0,
		heigth: 0
	},
	reducers: {
		loadBoard: (board, { payload }: PayloadAction<SerializableBoard>) => {
			return new Board(payload).toJSON();
		},
		selectCell: (board, { payload }: PayloadAction<Coords>) => {
			const coreBoard = new Board(board);
			const selectedCell = coreBoard.getCell(payload);
			const { x, y } = selectedCell;
			selectedCell.select();
			return coreBoard.toJSON();
		},
		deSelectCell: (board) => {
			const coreBoard = new Board(board);
			coreBoard.selectedCell?.deSelect();
			return coreBoard.toJSON();
		},
		moveCharacter: (board, { payload }: PayloadAction<number>) => {
			if (max-- < 0) {
				console.log("MAAAXXXX !!!!");
				return board
			}
			const coreBoard = new Board(board);
			const character = coreBoard.characters[payload];
			character.move(character.path[character.path.length - 1]);
			return coreBoard.toJSON();
		},
	}
})

export const {
	loadBoard,
	selectCell,
	deSelectCell,
	moveCharacter,
} = board.actions

export default board.reducer
