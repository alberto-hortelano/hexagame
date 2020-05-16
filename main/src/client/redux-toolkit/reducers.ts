import { combineReducers } from 'redux';
import action from './slices/gameAction';
import board from './slices/board';

export default combineReducers({
	action,
	board,
});
