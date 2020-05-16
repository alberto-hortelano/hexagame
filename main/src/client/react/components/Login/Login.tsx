import * as React from 'react';
import { useInputChange } from '../../lib/useInputChange';
import { SerializableGame } from 'core/Game';
import { exampleGames } from '../../lib/game';

interface LoginData {
	login: {
		name: string,
		password: string,
	},
	register: {
		name: string,
		password: string,
		email: string,
	},
}

const { useState } = React;

const login = async (setGame: (value: React.SetStateAction<SerializableGame>) => void, { name, password }: LoginData['login']) => {
	const serializableGame = await new Promise<SerializableGame>(resolve => setTimeout(() => {
		// In the server:
		// get the user's game from database
		console.log("log: login -> name, password", name, password);
		resolve(exampleGames['loggedInGame']);

	}));
	setGame(serializableGame);
}

const register = async (setGame: (value: React.SetStateAction<SerializableGame>) => void, { name, password, email }: LoginData['register']) => {
	const serializableGame = await new Promise<SerializableGame>(resolve => setTimeout(() => {
		// In the server:
		// generate new user
		// get the new user's game
		console.log("log: register -> name, password, email", name, password, email);
		resolve(exampleGames['newRegisterGame']);
	}));
	setGame(serializableGame);
}

const demo = async (setGame: (value: React.SetStateAction<SerializableGame>) => void) => {
	const serializableGame = await new Promise<SerializableGame>(resolve => setTimeout(() => {
		// In the server:
		// get the demo game from database
		console.log("log: login -> name, password", name);
		resolve(exampleGames['demo']);

	}));
	setGame(serializableGame);
}


export const Login = () => {
	const [data, handleInputChange] = useInputChange<LoginData>();
	const [game, setGame] = useState<SerializableGame>();
	if (game) {
		// return <Game serializableGame={game} />
	} else {
		return <div id="login">
			<div className="login">
				<input type="text" name="login.name" onChange={handleInputChange} />
				<input type="password" name="login.password" onChange={handleInputChange} />
				<button onClick={() => login(setGame, data.login)}>Login</button>
			</div>
			<div className="demo">
				<button onClick={() => demo(setGame)}>Demo</button>
			</div>
			<div className="register">
				<input type="text" name="register.name" onChange={handleInputChange} />
				<input type="password" name="register.password" onChange={handleInputChange} />
				<input type="email" name="register.email" onChange={handleInputChange} />
				<button onClick={() => register(setGame, data.register)}>Register</button>
			</div>
		</div>
	}
}

Login.displayName = 'Login';
