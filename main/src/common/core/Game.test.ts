import { Game, SerializableGame } from "./Game";
import { Character } from "./Character";
import { Obstacle } from "./Obstacle";

describe('Game', () => {
	const testGame: SerializableGame = {
		board: {
			width: 5,
			heigth: 5,
		}
	}
	const testCharacter = { index: 0, name: 'enemy', team: 'player', movement: 5 }
	it('Serializes and deserializes correctly', () => {
		const game = new Game(testGame);
		const enemy = new Character(testCharacter, game.board);
		const initialCell = game.board.getCell({ x: 3, y: 2 });
		initialCell.character = enemy;
		const gameClone = new Game(game.toJSON());
		expect(JSON.stringify(game)).toEqual(JSON.stringify(gameClone));
		expect(game).toStrictEqual(gameClone);
	})
	it('Moves character using cell.caracter', () => {
		const game = new Game(testGame);
		const enemy = new Character(testCharacter, game.board);
		const initialCell = game.board.getCell({ x: 3, y: 2 });
		const newCell = game.board.getCell({ x: 3, y: 3 });
		initialCell.character = enemy;
		expect('\n' + game.board.print()).toEqual(`
⬢ ⬢ ⬢ ⬢ ⬢ 
 ⬢ ⬢ ⬢ ⬢ ⬢ 
⬢ ⬢ ⬢ e ⬢ 
 ⬢ ⬢ ⬢ ⬢ ⬢ 
⬢ ⬢ ⬢ ⬢ ⬢ 
`);
		newCell.character = enemy;
		game.board.print();
		expect('\n' + game.board.print()).toEqual(`
⬢ ⬢ ⬢ ⬢ ⬢ 
 ⬢ ⬢ ⬢ ⬢ ⬢ 
⬢ ⬢ ⬢ ⬢ ⬢ 
 ⬢ ⬢ ⬢ e ⬢ 
⬢ ⬢ ⬢ ⬢ ⬢ 
`);
	})
	it('Moves character using caracter.position', () => {
		const game = new Game(testGame);
		const character = new Character(testCharacter, game.board);
		const initialCell = game.board.getCell({ x: 3, y: 2 });
		const newCell = game.board.getCell({ x: 3, y: 3 });
		character.position = initialCell;
		game.board.print();
		character.position = newCell;
		game.board.print();
	})
	it('calculates available movement for a character', () => {
		const game = new Game({
			board: {
				width: 8,
				heigth: 8,
			}
		});
		const character = new Character({ index: 0, team: 'player', name: '⦺', movement: 8 }, game.board);
		character.position = game.board.getCell({ x: 3, y: 2 })
		const origin = game.board.getCell({ x: 3, y: 2 });
		origin.character = character;
		const obs = { name: '⬢' };
		game.board.getCell({ x: 2, y: 2 }).obstacle = new Obstacle(obs);
		game.board.getCell({ x: 5, y: 0 }).obstacle = new Obstacle(obs);
		game.board.getCell({ x: 5, y: 1 }).obstacle = new Obstacle(obs);
		game.board.getCell({ x: 5, y: 2 }).obstacle = new Obstacle(obs);
		game.board.getCell({ x: 5, y: 3 }).obstacle = new Obstacle(obs);
		game.board.getCell({ x: 5, y: 4 }).obstacle = new Obstacle(obs);
		game.board.getCell({ x: 5, y: 5 }).obstacle = new Obstacle(obs);
		const availableMovement = game.board.calculateCharacterMovement(character);
		availableMovement.forEach((step, cell) => {
			const obstacle = { name: `${step}` };
			if (step > 0) {
				cell.obstacle = new Obstacle(obstacle)
			}
		});
		const p = game.board.print(true);
		expect('\n' + game.board.print()).toEqual(`
4 3 2 2 2 ⬢ ⬢ ⬢ 
 3 2 1 1 2 ⬢ ⬢ ⬢ 
4 3 ⬢ ⦺ 1 ⬢ ⬢ ⬢ 
 3 2 1 1 2 ⬢ 8 8 
4 3 2 2 2 ⬢ 7 7 
 4 3 3 3 3 ⬢ 6 7 
5 4 4 4 4 4 5 6 
 5 5 5 5 5 5 6 7 
`);
	});
});