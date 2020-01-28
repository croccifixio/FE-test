import { combineReducers } from 'redux'
import slotsState, { initialState as initialSlotsState } from './slots'

export const initialState = {
  slotsState: initialSlotsState,
};

export default combineReducers({
  slotsState,
})
