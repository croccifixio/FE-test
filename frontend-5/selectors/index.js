import { createSelector } from 'reselect'

export const selectState = () => state => state.formState

export const selectUser = () =>
  createSelector(
    selectState(),
    formState => formState.user
  )

export const selectErrors = () =>
  createSelector(
    selectState(),
    formState => formState.errors
  )
