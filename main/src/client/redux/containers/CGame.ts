import { connect } from 'react-redux'
import { SerializableGame } from 'core/Game';
import { Game } from '../../react/components/Game/Game';
import { setAction } from '../actions';

const mapStateToProps = (state: SerializableGame = {}) => ({
	action: state.action
})

const mapDispatchToProps = {
	setAction
}

export const CGame = connect(mapStateToProps, mapDispatchToProps)(Game);
