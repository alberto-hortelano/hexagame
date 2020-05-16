import * as React from 'react';
import { SerializableGame } from 'core/Game';

type Props = {
	game: SerializableGame,
	setAction: (action: string) => void
}

export const Game: React.FunctionComponent<Props> = ({ game: { action }, setAction, children }) => <div>
	<p>action: {action}</p>
	{children}
	<button onClick={() => {
		setAction('new Action')
	}}>set action</button>
</div>

Game.displayName = 'Game';
