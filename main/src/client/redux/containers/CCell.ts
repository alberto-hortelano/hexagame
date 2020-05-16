import { connect } from 'react-redux'
import { SerializableGame } from 'core/Game';
import { Cell } from '../../react/components/Cell/Cell';
import { selectCell } from '../actions';

const mapStateToProps = (state: SerializableGame) => ({
	selectedCell: state.board.selectedCell
})

const mapDispatchToProps = {
	selectCell
}

export const CCell = connect(mapStateToProps, mapDispatchToProps)(Cell);
