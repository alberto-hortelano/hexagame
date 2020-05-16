import * as React from 'react';
import { SerializableCharacter } from 'core/Character';
import { cellRadius } from '../../lib/constants';

export const Character = React.forwardRef<HTMLDivElement, { character: SerializableCharacter }>(({
	character: {
		name,
		position: { x, y },
		path
	}
}, ref) => <div className="character"
	ref={ref}
	style={{
		left: `${x * cellRadius + y % 2 * cellRadius / 2}px`,
		top: `${y * cellRadius - y * Math.floor(cellRadius / 7)}px`,
	}}
>
		<span>{name}</span>
		<span>{x + '-' + y}</span>
		<span>path: {path?.length}</span>
	</div>)

Character.displayName = 'Character';
