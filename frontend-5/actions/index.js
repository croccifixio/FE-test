import fetch from 'isomorphic-unfetch'

import {
  CREATE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  ERROR_SET,
  FIELD_VALIDATE,
  FORM_SUBMIT,
  SUCCESS_SHOW,
  USER_SET,
  VALUE_SET,
} from '../constants/actionTypes'

export const createUserFailure = () => ({ type: CREATE_USER_FAILURE })

export const createUserRequest = () => ({ type: CREATE_USER_REQUEST })

export const createUserSuccess = () => ({ type: CREATE_USER_SUCCESS })

export const setError = (error) => ({ type: ERROR_SET, error })

export const setUser = (user) => ({ type: USER_SET, user })

export const setValue = (name, value) => ({ type: VALUE_SET, name, value })

export const submitForm = () =>
  async (dispatch, getState) => {
    dispatch(createUserRequest())

    try {
      const payload = {
        email: getState().formState.values.email,
        name: getState().formState.values.name,
        password: getState().formState.values.password,
      }
      const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/${process.env.USERS_ENDPOINT}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      const user = await response.json()

      if (user.success) {
        dispatch(createUserSuccess())
        dispatch(setUser(user))
      } else {
        dispatch(createUserFailure(user.err))
        dispatch(setError(user.err))
      }
    }
    catch (err) {
      dispatch(createUserFailure(err))
    }
  }

export const validate = (name, value, rules) => ({ type: FIELD_VALIDATE, name, rules, value })
