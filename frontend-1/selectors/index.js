import { createSelector } from 'reselect'

export const selectState = () => state => state.country

export const selectCountryItem = () =>
  createSelector(
    selectState(),
    country => country.item,
  )
