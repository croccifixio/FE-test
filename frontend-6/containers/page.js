import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  compose,
  pure,
} from 'recompose'
import {
  checkForJWTToken,
  setValue,
  submitForm,
  validate,
} from '../actions'
import {
  selectUser,
  selectErrors,
} from '../selectors'
import Page from '../components/page'

export default compose(
  connect(
    createSelector(
      selectUser(),
      selectErrors(),
      (user, errors) => ({ user, errors }),
    ),
    {
      checkForJWTToken,
      setValue,
      submitForm,
      validate,
    },
  ),
  pure,
)(Page)
