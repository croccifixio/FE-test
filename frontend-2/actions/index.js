import {
  COUNTRY_CLEAR,
  FETCH_COUNTRY_FAILURE,
  FETCH_COUNTRY_REQUEST,
  FETCH_COUNTRY_SUCCESS,
} from '../constants/actionTypes'

export const clearCountry = () => ({ type: COUNTRY_CLEAR })

export const fetchCountryFailure = (err) => ({ type: FETCH_COUNTRY_FAILURE, err })

export const fetchCountryRequest = () => ({ type: FETCH_COUNTRY_REQUEST })

export const fetchCountrySuccess = (item) => ({ type: FETCH_COUNTRY_SUCCESS, item })

export const fetchCountry = (searchTerm) =>
  (dispatch) => {
    dispatch(fetchCountryRequest())

    return fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/${process.env.COUNTRIES_ENDPOINT}/${searchTerm}`)
      .then((res) => res.json())
      .then((body) => dispatch(fetchCountrySuccess(body)))
      .catch((err) => dispatch(fetchCountryFailure(err)))
  }
