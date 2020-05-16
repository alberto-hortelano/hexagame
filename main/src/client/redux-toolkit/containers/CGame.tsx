import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { SerializableGame } from 'core/Game';
import { setAction } from '../slices/gameAction';

type Component = ({ game, setAction }: {
	game: SerializableGame,
	setAction: (action: SerializableGame['action']) => void
}) => React.ReactElement;

type Container = React.FunctionComponent<{
	component: Component
}>

const { useEffect } = React;

export const CGame: Container = ({ component }) => {
	const dispatch = useDispatch();
	const game = useSelector<SerializableGame, SerializableGame>(game => game);

	useEffect(() => {
		dispatch(setAction('dispatch'))
	}, [dispatch])

	return component({ game, setAction })
};

CGame.displayName = 'CGame';
