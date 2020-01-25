import {
  COUNTRY_CLEAR,
  COUNTRY_SET,
} from '../constants/actionTypes'

export const clearCountry = (item) => ({ type: COUNTRY_CLEAR, item })

export const setCountry = (item) => ({ type: COUNTRY_SET, item })

export const fetchCountry = (searchTerm) =>
  (dispatch) => fetch(`http://localhost:3002/countries/${searchTerm}`).then(
    async (response) => dispatch(setCountry(await response.json())),
    console.error,
  )
