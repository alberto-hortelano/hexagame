import { connect } from 'react-redux'
import { SerializableGame } from 'core/Game';
import { Board } from '../../react/components/Board/Board';
import { selectCell } from '../actions';

const mapStateToProps = (state: SerializableGame = {}) => {
	console.log("log: state", state)
	return {
		cells: state.board.cells || [],
		selectedCell: state.board.selectedCell,
		deSelectCell: () => void 0,
		characters: state.board.characters,
	}
}


const mapDispatchToProps = {
	selectCell
}

export const CBoard = connect(mapStateToProps, mapDispatchToProps)(Board)
