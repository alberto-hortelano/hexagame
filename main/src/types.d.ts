import { Game } from 'core/Game';

interface GameState {
	game: Game;
	setGame: React.Dispatch<React.SetStateAction<Game>>
}
