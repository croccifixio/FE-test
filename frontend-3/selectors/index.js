import { createSelector } from 'reselect'

export const selectState = () => state => state.countriesState

export const selectCountries = () =>
  createSelector(
    selectState(),
    countriesState => countriesState.filteredCountries
  )
