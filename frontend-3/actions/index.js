import fetch from 'isomorphic-unfetch'

import {
  FETCH_COUNTRIES_FAILURE,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FILTER_COUNTRIES,
  FILTER_COUNTRIES_RESET,
} from '../constants/actionTypes'

export const fetchCountriesFailure = (err) => ({ type: FETCH_COUNTRIES_FAILURE, err })

export const fetchCountriesRequest = () => ({ type: FETCH_COUNTRIES_REQUEST })

export const fetchCountriesSuccess = (countries) => ({ type: FETCH_COUNTRIES_SUCCESS, countries })

export const fetchCountries = () =>
  async (dispatch) => {
    dispatch(fetchCountriesRequest())

    try {
      const res = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/${process.env.COUNTRIES_ENDPOINT}`)
      const countries = await res.json()

      if (countries.err) throw new Error(countries.err)
      dispatch(fetchCountriesSuccess(countries))
    }

    catch(err) {
      dispatch(fetchCountriesFailure(err))
    }
  }

export const filterCountries = (filterTerm) => ({ type: FILTER_COUNTRIES, filterTerm })

export const resetFilteredCountries = () => ({ type: FILTER_COUNTRIES_RESET })
