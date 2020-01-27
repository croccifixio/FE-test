import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  compose,
  pure,
} from 'recompose'
import {
  fetchCountries,
  filterCountries,
  resetFilteredCountries,
} from '../actions'
import {
  selectCountries,
  selectFilterTerm,
} from '../selectors'
import Page from '../components/page'

export default compose(
  connect(
    createSelector(
      selectCountries(),
      (countries) => ({ countries }),
    ),
    {
      fetchCountries,
      filterCountries,
      resetFilteredCountries,
    },
  ),
  pure,
)(Page)
