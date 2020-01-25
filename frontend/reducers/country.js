import {
  COUNTRY_CLEAR,
  COUNTRY_SET,
} from '../constants/actionTypes'

export const initialState = {
  item: {}
}

export default (state = initialState, action) => {
  const { item, type } = action

  switch (type) {
    case COUNTRY_CLEAR: {
      return { ...state, item: {} }
    }
    case COUNTRY_SET: {
      return { ...state, item }
    }
    default: {
      return state
    }
  }
}
