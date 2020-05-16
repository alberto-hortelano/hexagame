import * as React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { Game } from "./Game";
import { SerializableGame, Game as CoreGame } from 'core/Game';

describe('Game', () => {
	const testGame: SerializableGame = {
		board: {
			width: 5,
			heigth: 5,
		}
	}
	let container: HTMLDivElement = null;
	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	});
	it('Renders', () => {
		// act(() => {
		// 	render(<Game serializableGame={testGame} setAction={() => void 0} />, container);
		// });
		console.log("log: container", container.innerHTML);
	});
});
