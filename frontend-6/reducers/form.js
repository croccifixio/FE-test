import EmailValidator from 'email-validator'

import {
  ERROR_SET,
  FIELD_VALIDATE,
  JWT_TOKEN_RETRIEVE,
  SUCCESS_SHOW,
  USER_SET,
  VALUE_SET,
} from '../constants/actionTypes'

const getError = (value) =>
  (acc, [ruleName, ruleValue]) => {
    if (acc.length > 0) return acc

    if (ruleName === 'required' &&
     ruleValue === true &&
     value.length < 1
    ) return 'This field is required'

    if (ruleName === 'minLength' &&
      value.length < ruleValue
    ) return `This field must contain at least ${ruleValue} characters`

    if (ruleName === 'format' &&
      ruleValue === 'email' &&
      !EmailValidator.validate(value)
    ) return `This field must contain a valid ${ruleValue}`

    return ''
  }

export const initialState = {
  user: {},
  errors: {},
  values: {},
}

export default (state = initialState, action) => {
  const { error, name, rules, token, type, user, value } = action

  switch (type) {
    case ERROR_SET: {
      return {
        ...state,
        errors: {
          ...state.errors,
          email: error,
        }
      }
    }

    case FIELD_VALIDATE: {
      const errorMessage = Object.entries(rules).reduce(getError(value), '')

      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: errorMessage,
        }
      }
    }

    case JWT_TOKEN_RETRIEVE: {
      return {
        ...state,
        user: {
          ...state.user,
          token,
        },
      }
    }

    case USER_SET: {
      return {
        ...state,
        user: {
          ...state.user,
          ...user,
        },
      }
    }

    case VALUE_SET: {
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
      }
    }

    default: {
      return state
    }
  }
}
