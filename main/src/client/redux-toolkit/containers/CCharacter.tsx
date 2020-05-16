import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SerializableCharacter } from 'core/Character';
import { SerializableGame } from 'core/Game';
import { moveCharacter } from '../slices/board';
import { cellRadius } from '../../react/lib/constants';

type Component = ({ character, ref }: { character: SerializableCharacter, ref: React.MutableRefObject<HTMLDivElement> }) => React.ReactElement;

type Container = React.FunctionComponent<{
	character: SerializableCharacter,
	component: Component
}>

const { useRef, useEffect, useState } = React;

export const CCharacter: Container = ({ character: { index }, component }) => {
	const dispatch = useDispatch();
	const [animation, setAnimation] = useState<Animation>()
	const character = useSelector<SerializableGame, SerializableCharacter>(({ board }) => board.characters[index]);
	const ref = useRef<HTMLDivElement>();

	useEffect(() => {
		if (character.path?.length) {
			const keyframes = [character.position, ...character.path].map(({ x, y }) => ({
				left: `${x * cellRadius + y % 2 * cellRadius / 2}px`,
				top: `${y * cellRadius - y * Math.floor(cellRadius / 7)}px`,
			}));
			const time = character.path.length * 500;
			const { x, y } = character.position;
			if (animation) {
				animation.finish();
			}
			setAnimation(() => ref.current.animate(keyframes, time))
			dispatch(moveCharacter(character.index));
		}
	}, [character.path])

	return component({
		character,
		ref
	});
}

CCharacter.displayName = 'CCharacter';
