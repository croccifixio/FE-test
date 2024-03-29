import { createSelector } from 'reselect'

export const selectState = () => state => state.slotsState

export const selectPoints = () =>
  createSelector(
    selectState(),
    slotsState => slotsState.points
  )

export const selectSlots = () =>
  createSelector(
    selectState(),
    slotsState => slotsState.slots
  )

export const selectWinningPayline = () =>
  createSelector(
    selectState(),
    slotsState => slotsState.winningPayline
  )
