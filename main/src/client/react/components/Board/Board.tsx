import * as React from 'react';
import { SerializableBoard, Coords } from 'core/Board';
import { SerializableCell } from 'core/Cell';
import { SerializableCharacter } from 'core/Character';

type Props = {
	board: SerializableBoard,
	selectCell?: (cell: Coords) => void,
	deSelectCell?: () => void,
	components: {
		cell: ({ cell }: { cell: SerializableCell }) => React.ReactElement<{ cell: SerializableCell }>,
		character?: ({ character }: { character: SerializableCharacter }) => React.ReactElement<{ character: SerializableCharacter }>,
	}
}

export const Board: React.FunctionComponent<Props> = ({
	board: {
		cells,
		selectedCell,
		characters
	},
	selectCell,
	deSelectCell,
	components
}) => <div className="board">
		<div className="clickable-board">
			{
				cells.map((row, y) =>
					<ul key={y}>{
						row.map((cell, x) =>
							<li key={x} onMouseDown={() => {
								selectCell({ x, y })
							}}></li>
						)
					}</ul>
				)
			}
		</div>
		<div className="canvas-board">
			{
				cells.map((row, y) =>
					<ul key={y}>{
						row.map((cell, x) =>
							<li key={x} >{
								components.cell({ cell })
							}</li>
						)
					}</ul>
				)
			}
		</div>
		{
			characters &&
			<ul className="characters">
				{
					characters.map((character, k) =>
						<li key={k} >{
							components.character({ character })
						}</li>
					)
				}
			</ul>
		}
		<p>selectedCell: {selectedCell?.x}-{selectedCell?.y}</p>
		<button onClick={deSelectCell}>Unselect Cell</button>
	</div>

Board.displayName = 'Board';
