import { combineReducers } from 'redux'
import countriesState, { initialState as initialCountriesState } from './countries'

export const initialState = {
  countriesState: initialCountriesState,
};

export default combineReducers({
  countriesState,
})
