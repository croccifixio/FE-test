import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {
  compose,
  pure,
} from 'recompose'
import {
  play,
} from '../actions'
import {
  selectPoints,
  selectSlots,
  selectWinningPayline,
} from '../selectors'
import Page from '../components/page'

export default compose(
  connect(
    createSelector(
      selectPoints(),
      selectSlots(),
      selectWinningPayline(),
      (points, slots, winningPayline) => ({ points, slots, winningPayline }),
    ),
    {
      play,
    },
  ),
  pure,
)(Page)
