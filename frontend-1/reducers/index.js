import { combineReducers } from 'redux'
import country, { initialState as countryState } from './country'

export const initialState = {
  country: countryState,
};

export default combineReducers({
  country,
})
