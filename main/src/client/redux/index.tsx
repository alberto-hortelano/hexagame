import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Game } from 'core/Game';
import { initStore } from './reducers';
import { CGame } from './containers/CGame';
import { CBoard } from './containers/CBoard';
import { CCell } from './containers/CCell';
import { exampleGames } from '../react/lib/game';

const initalState = new Game(exampleGames.demo).toJSON();
const store = createStore(initStore(initalState));

// render(<Provider store={store}>
// 	<CGame >
// 		<CBoard >
// 			<CCell x={0} y={0} />
// 		</CBoard>
// 	</CGame>
// </Provider>, document.getElementById('app'));
