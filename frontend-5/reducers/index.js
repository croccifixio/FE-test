import { combineReducers } from 'redux'
import formState, { initialState as initialFormState } from './form'

export const initialState = {
  formState: initialFormState,
};

export default combineReducers({
  formState,
})
