/*
Board dessign:
The natural hexagonal board in an x-y notation will be like:
      	X
    0-0 1-0 2-0 ...
 Y    0-1 1-1 2-1 ...
	    0-2 1-2 2-2 ...
		  0-3 1-3 2-3 ...

Creating a rombic shape.

- This is how cells in a radius look in a natural board:
. . . . . . . . 
 . . . X X X . . 
  . . X X X X . . 
   . X X X X X . . 
    . X X X X . . . 
	 . X X X . . . . 

- And how it transforms to a rectangular grid:
. . . . . . . . 
. . . X X X . . 
. . X X X X . . 
. X X X X X . . 
. X X X X . . . 
. X X X . . . . 
		  
But we want a rectangular shape to fit the normal screen so we have a board like:
      	X
    0-0 1-0 2-0 ...
 Y    0-1 1-1 2-1 ...
	0-2 1-2 2-2 ...
	  0-3 1-3 2-3 ...

- This is how cells in a radius look in a rectangular board:
. . . . . . . . 
 . . X X X . . . 
. . X X X X . . 
 . X X X X X . . 
. . X X X X . . 
 . . X X X . . . 

- And how it transforms to a rectangular grid:
. . . . . . . . 
. . X X X . . . 
. . X X X X . . 
. X X X X X . . 
. . X X X X . . 
. . X X X . . . 

This shape is not simetric and depending on where the center is, in a even or an odd row, 
the shape may be inverted like:
. . . . . . . . 
 . . . . . . . . 
. . . X X X . . 
 . . X X X X . . 
. . X X X X X . 
 . . X X X X . . 
. . . X X X . .  

Turning into:
. . . . . . . . 
. . . . . . . . 
. . . X X X . . 
. . X X X X . . 
. . X X X X X . 
. . X X X X . . 
. . . X X X . . 

This is what causes the "y % 2" in some of the vertexCalculator formulas

*/

import { Character } from "../core/Character";
import { Cell } from "../core/Cell";
import { Coords } from "../core/Board";

export type bounds = {
	x: {
		from: number,
		to: number
	},
	y: {
		from: number,
		to: number
	},
};

type VertexCalculator = (({ x, y }: {
	x: number;
	y: number;
}) => {
	x: number;
	y: number;
})[]
/**
 * Formulas to calculate each adjacent vertex of a cell.
 * ordered like:
 *   0  1
 * 5      2
 *   4  3
 */
const vertexCalculator: VertexCalculator = [
	({ x, y }) => ({
		x: x + y % 2 - 1,
		y: y - 1
	}),
	({ x, y }) => ({
		x: x + y % 2,
		y: y - 1
	}),
	({ x, y }) => ({
		x: x + 1,
		y: y
	}),
	({ x, y }) => ({
		x: x + y % 2,
		y: y + 1
	}),
	({ x, y }) => ({
		x: x + y % 2 - 1,
		y: y + 1
	}),
	({ x, y }) => ({
		x: x - 1,
		y: y
	}),
];

export const isCellOffBounds = ({ x, y }: Coords, bounds: bounds) => {
	return (
		x < bounds.x.from ||
		y < bounds.y.from ||
		x >= bounds.x.to ||
		y >= bounds.y.to
	);
}

export const getCellsInRadius = ({ x, y }: Coords, radius: number, bounds: bounds) => {
	if (radius < 0 || parseInt(`${radius}`) !== radius) {
		throw new Error("Radius must be a possitive integer");
	}
	if (isCellOffBounds({ x, y }, bounds)) {
		throw new Error(`Cell is outside of board bounds:
			Cell: ${x}-${y}
			Board width: ${bounds.x.to}
			Board heigth: ${bounds.y.to}
		`);
	}
	const cells: Coords[] = [];
	let currentRadius = 0;
	let vertices = [];
	while (currentRadius < radius) {
		let vertexIndex = 0;
		while (vertexIndex < 6) {
			const vertex = vertexCalculator[vertexIndex](vertices[vertexIndex] || { x, y });
			vertices[vertexIndex] = vertex;
			const newCells = [vertex, ...calculateEdges(vertexIndex, vertex, currentRadius)].filter(cell => !isCellOffBounds(cell, bounds))
			cells.push(...newCells);
			vertexIndex++;
		}
		currentRadius++
	}
	return cells;
}
const findAdjacentCells = (cell: Cell, cells: Cell[][], filter?: (cell: Cell) => boolean) => vertexCalculator.reduce((adjacents: Cell[], calculator) => {
	const { x, y } = calculator({ x: cell.x, y: cell.y });
	const adjacent = cells?.[y]?.[x];
	if (!adjacent) {
		return adjacents;
	}
	if (filter && !filter(adjacent)) {
		return adjacents;
	}
	adjacents.push(adjacent);
	return adjacents;
}, [])
const calculateCellSteps = (cell: Cell, step: number, maxStep: number, cells: Cell[][], character: Character, movementCosts: Map<Cell, number>) => {
	const adjacentCells = findAdjacentCells(cell, cells);
	step += character.calculateCellMovementCost(cell, adjacentCells);
	if (step > maxStep) {
		return;
	}
	adjacentCells.forEach(adjacentCell => {
		const prevStep = movementCosts.get(adjacentCell);
		if (!!adjacentCell.obstacle || !!adjacentCell.character) {
			return;
		}
		if (prevStep === void 0 || prevStep > step) {
			movementCosts.set(adjacentCell, step);
		}
		calculateCellSteps(adjacentCell, step, maxStep, cells, character, movementCosts);
	});
}
export const calculateMovement = (character: Character, cells: Cell[][]) => {
	const movementCosts: Map<Cell, number> = new Map();
	movementCosts.set(character.position, 0);
	calculateCellSteps(character.position, 0, character.movementLeft, cells, character, movementCosts);
	return movementCosts;
}

export const calculateEdges = (vertexIndex: number, vertex: Coords, currentRadius: number) => {
	const cells: Coords[] = [];
	let step = 0;
	let last = vertex
	while (step < currentRadius) {
		const next = vertexCalculator[(vertexIndex + 2) % 6](last);
		cells.push(next);
		last = next;
		step++;
	}
	return cells;
}

export const getAdjacentCells = (cell: Coords, bounds: bounds) => getCellsInRadius(cell, 1, bounds);

export const print = (width: number, heigth: number, cells: Cell[][], colored = false) => {
	let txt = '';
	let y = 0;
	const colors = {
		green: '\u001b[32m',
		red: '\u001b[31m',
		blue: '\u001b[34m',
	}
	const getColor = (color: string) => {
		if (colored) {
			return colors[color];
		}
		return '';
	}
	while (y < heigth) {
		let x = 0;
		if (y % 2) {
			txt += ' ';
		}
		while (x < width) {
			let cellTxt = getColor('green');
			if (cells[y][x].obstacle) {
				cellTxt += getColor('red') + cells[y][x].obstacle.name[0] + getColor('green');
			} else if (cells[y][x].character) {
				cellTxt += getColor('blue') + cells[y][x].character.name[0] + getColor('green');
			} else {
				cellTxt += '⬢';
			}
			txt += cellTxt + ' ';
			x++;
		}
		txt += '\n';
		y++;
	}
	return txt;
}
// export const print_OLD = (width: number, heigth: number, cells: Cell[][]) => {
// 	let txt = '';
// 	let y = 0;
// 	while (y < heigth) {
// 		let x = 0;
// 		let nextLine = '';
// 		if (y % 2) {
// 			txt += '  ▐ ';
// 			nextLine += ' ⟋';
// 		} else {
// 			txt += '▐ ';
// 		}
// 		while (x < width) {
// 			const cellTxt = '\u001b[31m' + (cells[y][x].character?.name?.[0] || cells[y][x].obstacle?.name?.[0] || ' ') + '\u001b[32m';
// 			txt += cellTxt + ' ▐ ';
// 			nextLine += ' ⟍ ⟋';
// 			x++;
// 		}
// 		txt += '\n';
// 		if (!(y % 2)) {
// 			nextLine += ' ⟍';
// 		}
// 		if (y === 3) {
// 			txt = nextLine + '\n' + txt;
// 		}
// 		txt += nextLine;
// 		txt += '\n';
// 		y++;
// 	}
// 	return txt;
// }
