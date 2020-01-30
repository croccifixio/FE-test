import fetch from 'isomorphic-unfetch'

import {
  ERROR_SET,
  FIELD_VALIDATE,
  FORM_SUBMIT,
  JWT_TOKEN_RETRIEVE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SUCCESS_SHOW,
  USER_SET,
  VALUE_SET,
} from '../constants/actionTypes'

export const checkForJWTToken = () =>
  (dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) return

    dispatch(retrieveJWTToken(token))
  }

export const loginFailure = () => ({ type: LOGIN_FAILURE })

export const loginRequest = () => ({ type: LOGIN_REQUEST })

export const loginSuccess = () => ({ type: LOGIN_SUCCESS })

export const retrieveJWTToken = (token) => ({ type: JWT_TOKEN_RETRIEVE, token })

export const setError = (error) => ({ type: ERROR_SET, error })

export const setUser = (user) => ({ type: USER_SET, user })

export const setValue = (name, value) => ({ type: VALUE_SET, name, value })

export const submitForm = () =>
  async (dispatch, getState) => {
    dispatch(loginRequest())

    try {
      const payload = {
        email: getState().formState.values.email,
        name: getState().formState.values.name,
        password: getState().formState.values.password,
      }
      const response = await fetch(`${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/${process.env.LOGIN_ENDPOINT}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      const user = await response.json()

      if (user.success) {
        const { token } = user

        localStorage.setItem('token', token)
        dispatch(loginSuccess())
        dispatch(setUser(user))
      } else {
        dispatch(loginFailure(user.err))
        dispatch(setError(user.err))
      }
    }
    catch (err) {
      dispatch(loginFailure(err))
    }
  }

export const validate = (name, value, rules) => ({ type: FIELD_VALIDATE, name, rules, value })
