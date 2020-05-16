import { Board } from "./Board";
import * as libBoard from '../lib/board';
import { Cell } from "./Cell";

jest.mock('../lib/board');

describe('Board', () => {
	const boardWidth = 20;
	const boardHeigth = 15;
	const exampleCoords = { x: 4, y: 3 };
	let exampleCell: Cell;
	let board: Board;

	beforeEach(() => {
		board = new Board({
			width: boardWidth,
			heigth: boardHeigth,
			cells: []
		});
		exampleCell = board.newCell(exampleCoords);
	});
	it('creates boards', () => {
		expect(board.width).toBe(boardWidth);
		expect(board.heigth).toBe(boardHeigth);
	});
	describe('getBounds', () => {
		it('returns board bounds', () => {
			expect(board.getBounds()).toEqual({
				x: {
					from: 0,
					to: boardWidth
				},
				y: {
					from: 0,
					to: boardHeigth
				}
			});
		});
	});
	describe('isCellOffBounds', () => {
		it('delegates logic to board lib', () => {
			board.isCellOffBounds(exampleCoords);
			expect(libBoard.isCellOffBounds).toHaveBeenCalledWith(exampleCoords, board.getBounds());
		});
	});
	describe('getCellsInRadius', () => {
		it('delegates logic to board lib', () => {
			board.getCellsInRadius(exampleCell, 4);
			expect(libBoard.getCellsInRadius).toHaveBeenCalledWith(exampleCell, 4, board.getBounds());
		});
	});
	describe('getAdjacentCells', () => {
		it('delegates logic to board lib', () => {
			board.getAdjacentCells(exampleCell);
			expect(libBoard.getAdjacentCells).toHaveBeenCalledWith(exampleCell, board.getBounds());
		});
	});
});