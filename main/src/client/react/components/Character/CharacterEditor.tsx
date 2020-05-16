import * as React from 'react';
import { Character } from 'core/Character';
import { defaults } from 'lib/helpers';

export const CharacterEditor: React.FunctionComponent<{ character?: Character }> = ({ character = defaults.character }) => <div>
	<span>{character.name}</span>
	<span>{character.position.x + '-' + character.position.y}</span>
</div>

CharacterEditor.displayName = 'CharacterEditor';
