import intersection from 'lodash.intersection'

import {
  COUNTRIES_CLEAR,
  COUNTRY_CLEAR,
  FETCH_COUNTRY_FAILURE,
  FETCH_COUNTRY_REQUEST,
  FETCH_COUNTRY_SUCCESS,
  SEARCH_TERM_CLEAR,
  SEARCH_TERM_SET,
  SEARCH_TERMS_CLEAR,
} from '../constants/actionTypes'

export const clearCountries = () => ({ type: COUNTRIES_CLEAR })

export const clearCountry = (country) => ({ type: COUNTRY_CLEAR, country })

export const clearSearchTerm = (searchTerm) => ({ type: SEARCH_TERM_CLEAR, searchTerm })

export const clearSearchTerms = () => ({ type: SEARCH_TERMS_CLEAR })

export const fetchCountryFailure = (err) => ({ type: FETCH_COUNTRY_FAILURE, err })

export const fetchCountryRequest = () => ({ type: FETCH_COUNTRY_REQUEST })

export const fetchCountrySuccess = (country, searchTerm) => ({ type: FETCH_COUNTRY_SUCCESS, country, searchTerm })

export const fetchCountry = (searchTerm) =>
  (dispatch) => {
    dispatch(fetchCountryRequest())

    return fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/${process.env.COUNTRIES_ENDPOINT}/${searchTerm}`)
      .then((res) => res.json())
      .then((country) => {
        if (country.err) throw new Error(country.err)
        dispatch(fetchCountrySuccess(country, searchTerm))
      })
      .catch((err) => dispatch(fetchCountryFailure(err)))
  }

export const fetchCountries = (searchTerms) =>
  (dispatch, getState) => {
    const clearableCountries = getState().country.data.filter((country) => intersection(country.searchTerms, searchTerms).length === 0)
    const clearableSearchTerms = getState().country.searchTerms.filter((searchTerm) => !searchTerms.includes(searchTerm))
    const uniqueSearchTerms = searchTerms.filter((searchTerm) => !getState().country.searchTerms.includes(searchTerm))

    clearableCountries.forEach((country) => dispatch(clearCountry(country)))
    clearableSearchTerms.forEach((country) => dispatch(clearSearchTerm(country)))
    uniqueSearchTerms.forEach((searchTerm) => {
      dispatch(setSearchTerm(searchTerm))
      dispatch(fetchCountry(searchTerm))
    })
  }

export const setSearchTerm = (searchTerm) => ({ type: SEARCH_TERM_SET, searchTerm })
