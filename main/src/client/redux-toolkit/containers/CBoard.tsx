import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { SerializableGame } from 'core/Game';
import { SerializableBoard } from 'core/Board';
import { SerializableCell } from 'core/Cell';
import { loadBoard, deSelectCell, selectCell } from '../slices/board';
import { exampleGames } from '../../react/lib/game';

type Component = ({
	board,
	selectCell,
	deSelectCell,
}: {
	board: SerializableBoard,
	selectCell: (cell: SerializableCell) => void,
	deSelectCell: () => void,
}) => React.ReactElement;

type Container = React.FunctionComponent<{
	component: Component
}>

const { useEffect } = React;

const typedDeSelectCell = deSelectCell as ActionCreatorWithoutPayload<string>;

export const CBoard: Container = ({ component }) => {
	const dispatch = useDispatch();
	const board = useSelector<SerializableGame, SerializableBoard>(game => game.board);

	useEffect(() => {
		dispatch(loadBoard(exampleGames.demo.board))
	}, [dispatch])

	return board.cells ?
		component({
			board,
			selectCell: (cell) => dispatch(selectCell(cell)),
			deSelectCell: () => dispatch(typedDeSelectCell()),
		}) :
		<div>Loading...</div>
};

CBoard.displayName = 'CBoard';
