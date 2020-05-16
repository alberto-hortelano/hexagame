import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'
import { SerializableGame } from 'core/Game'

const actionSlice = createSlice<SerializableGame['action'], SliceCaseReducers<SerializableGame['action']>>({
	name: 'gameAction',
	initialState: 'initial',
	reducers: {
		setAction: (state, { payload }) => payload
	}
})
export const {
	setAction
} = actionSlice.actions

export default actionSlice.reducer
