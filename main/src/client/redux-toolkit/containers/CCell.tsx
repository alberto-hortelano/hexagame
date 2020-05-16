import * as React from 'react';
import { useSelector } from 'react-redux'
import { SerializableGame } from 'core/Game';
import { SerializableCell } from 'core/Cell';

type Component = ({ cell }: { cell: SerializableCell }) => React.ReactElement;

type Container = React.FunctionComponent<{
	cell: SerializableCell,
	component: Component
}>

export const CCell: Container = ({ cell: { x, y }, component }) => {
	const cell = useSelector<SerializableGame, SerializableCell>(({ board }) => board.cells[y][x]);
	return component({
		cell
	})
};

CCell.displayName = 'CCell';
