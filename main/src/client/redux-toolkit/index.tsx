import * as React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { CGame } from './containers/CGame';
import { Game } from 'components/Game/Game';
import { CBoard } from './containers/CBoard';
import { Board } from 'components/Board/Board';
import { CCell } from './containers/CCell';
import { Cell } from 'components/Cell/Cell';
import { CCharacter } from './containers/CCharacter';
import { Character } from 'components/Character/Character';

const store = configureStore({ reducer });
console.log("log: store", store.getState());

render(
	<Provider store={store}>
		<CGame component={props =>
			<Game {...props}>
				<CBoard component={props =>
					<Board {...props} components={{
						cell: (props) =>
							<CCell {...props} component={props =>
								<Cell {...props} />
							} />
						,
						character: (props) => <CCharacter {...props} component={props =>
							<Character {...props} />
						} />
					}} />
				} />
			</Game>
		} />
	</Provider>,
	document.getElementById('app')
);
