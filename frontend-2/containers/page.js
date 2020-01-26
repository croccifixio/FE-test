import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  compose,
  pure,
} from 'recompose'
import {
  clearCountries,
  clearSearchTerms,
  fetchCountries,
} from '../actions'
import {
  selectCountryData,
  selectSearchTerms,
} from '../selectors'
import Page from '../components/page'

export default compose(
  connect(
    createSelector(
      selectCountryData(),
      selectSearchTerms(),
      (data, searchTerms) => ({ data, searchTerms }),
    ),
    {
      clearCountries,
      clearSearchTerms,
      fetchCountries,
    },
  ),
  pure,
)(Page)
