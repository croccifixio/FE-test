import { createSelector } from 'reselect'

export const selectState = () => state => state.country

export const selectCountryData = () =>
  createSelector(
    selectState(),
    country => country.data,
  )

export const selectSearchTerms = () =>
  createSelector(
    selectState(),
    country => country.searchTerms,
  )
