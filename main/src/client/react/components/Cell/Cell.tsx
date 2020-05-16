import * as React from 'react';
import { SerializableCell } from "core/Cell";

export const Cell: React.FunctionComponent<{ cell: SerializableCell }> = ({ cell: { x, y, selected, step } }) => <span
	className="cell"
	style={{
		color: selected ? "red" : "blue",
		background: step ? "pink" : "transparent"
	}}
>
	<span className="inner">
		{x}-{y}
	</span>
	{step && <span className="movement">{step}</span>}
</span>

Cell.displayName = 'Cell';
