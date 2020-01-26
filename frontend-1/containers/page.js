import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  compose,
  pure,
} from 'recompose'
import {
  clearCountry,
  fetchCountry,
} from '../actions'
import {
  selectCountryItem,
} from '../selectors'
import Page from '../components/page'

export default compose(
  connect(
    createSelector(
      selectCountryItem(),
      (item, data) => ({ item, data }),
    ),
    {
      clearCountry,
      fetchCountry,
    },
  ),
  pure,
)(Page)
