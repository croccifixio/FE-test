import fetch from 'isomorphic-unfetch'

import {
  PRIZE_CALCULATE,
  POINTS_DECREASE,
  POINTS_INCREASE,
  SPIN,
  WINNING_PAYLINE_RESET,
} from '../constants/actionTypes'

export const awardPoints = (amount) =>
  (dispatch) => {
    dispatch(increasePoints(amount))
  }

export const calculatePrize = () => ({ type: PRIZE_CALCULATE })

export const decreasePoints = (amount) => ({ type: POINTS_DECREASE, amount })

export const increasePoints = (amount) => ({ type: POINTS_INCREASE, amount })

export const play = () =>
  (dispatch, getState) => {
    dispatch(resetWinningPayline())
    dispatch(decreasePoints(1))
    dispatch(spin())
    dispatch(calculatePrize())

    const winningPayline = getState().slotsState.winningPayline
    if (!winningPayline) return

    dispatch(awardPoints(winningPayline.prize))
  }

export const resetWinningPayline = () => ({ type: WINNING_PAYLINE_RESET })

export const spin = () => ({ type: SPIN })
