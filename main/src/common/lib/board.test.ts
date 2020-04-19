import { isCellOffBounds, getCellsInRadius, getAdjacentCells, calculateMovement } from "./board";
import { SerializableGame, Game } from "../core/Game";
import { Character } from "../core/Character";


describe('board', () => {
	const bounds = {
		x: {
			from: 0,
			to: 10
		},
		y: {
			from: 0,
			to: 20
		},
	}
	describe('isCellOffBounds', () => {
		it('checks if a cell is outside of board bounds', () => {
			expect(isCellOffBounds({ x: 0, y: 0 }, bounds)).toBeFalsy();
			expect(isCellOffBounds({ x: 1, y: 10 }, bounds)).toBeFalsy();
			expect(isCellOffBounds({ x: -1, y: -10 }, bounds)).toBeTruthy();
			expect(isCellOffBounds({ x: bounds.x.to, y: bounds.y.to }, bounds)).toBeTruthy();
			expect(isCellOffBounds({ x: bounds.x.to + 10, y: bounds.y.to + 10 }, bounds)).toBeTruthy();
		});
	});
	describe('getCellsInRadius', () => {
		it('calculates cells at any radius from a given cell', () => {
			const expectedCellsInRadius = [
				/*                     */{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 },
				/*              */{ x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }, { x: 8, y: 2 },
				/*       */{ x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 },
				/**/{ x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, /*  4 - 5  */ { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 },
				/*       */{ x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 },
				/*              */{ x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 },
				/*                     */{ x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 },
			];
			const cellsInRadius = getCellsInRadius({ x: 4, y: 5 }, 3, bounds);
			expect(cellsInRadius.length).toEqual(expectedCellsInRadius.length);
			cellsInRadius.forEach(cell => expect(expectedCellsInRadius.includes(cell)));
		});
		it('excludes cells outside of board bounds', () => {
			const expectedCellsInRadius = [
				/* { x: 0, y: 0 },*/{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
				/*        */{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
				/**/{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
				/*        */{ x: 0, y: 3 }, { x: 1, y: 3 },
			];
			const cellsInRadius = getCellsInRadius({ x: 0, y: 0 }, 3, bounds);
			expect(cellsInRadius.length).toEqual(expectedCellsInRadius.length);
			cellsInRadius.forEach(cell => expect(expectedCellsInRadius.includes(cell)));
		});
		it('throws error if given cell is outside of board bounds', () => {
			expect(() => getCellsInRadius({ x: -1, y: -1 }, 1, bounds)).toThrowError();
			expect(() => getCellsInRadius({ x: bounds.x.to + 10, y: bounds.y.to + 10 }, 1, bounds)).toThrowError();
		});
		it('throws error if given radius is not a positive integer', () => {
			expect(() => getCellsInRadius({ x: 3, y: 3 }, -1, bounds)).toThrowError();
			expect(() => getCellsInRadius({ x: 3, y: 3 }, 1.5, bounds)).toThrowError();
		});
	});
	describe('getAdjacentCells', () => {
		it('calculates cells adjacent to a given cell', () => {
			const expectedCellsInRadius = [
			/*                */{ x: 4, y: 4 }, { x: 5, y: 4 },

			/**/{ x: 3, y: 5 }, /*      { x: 4, y: 5 }        */{ x: 5, y: 5 },

			/*                 */{ x: 3, y: 6 }, { x: 4, y: 6 },
			];
			const cellsInRadius = getAdjacentCells({ x: 4, y: 5 }, bounds);
			expect(cellsInRadius.length).toEqual(expectedCellsInRadius.length);
			cellsInRadius.forEach(cell => expect(expectedCellsInRadius.includes(cell)));
		});
	});

	// {
	// 	2: {
	// 		8: {
	// 			character: {
	// 				name: 'enemy',
	// 				movement: 5
	// 			}
	// 		}
	// 	},
	// 	5: {
	// 		5: {
	// 			obstacle: {
	// 				name: 'rock'
	// 			}
	// 		}
	// 	},
	// 	9: {
	// 		1: {
	// 			character: {
	// 				name: 'hero ',
	// 				movement: 4
	// 			}
	// 		}
	// 	}
	// }
	describe('calculateMovement', () => {
	});
});