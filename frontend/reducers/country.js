import {
  COUNTRY_CLEAR,
  FETCH_COUNTRY_FAILURE,
  FETCH_COUNTRY_SUCCESS,
} from '../constants/actionTypes'

export const initialState = {
  item: {
    capital: '',
    continent: '',
    languages: [],
    name: '',
    tlds: [],
  },
  err: '',
}

export default (state = initialState, action) => {
  const { err, item, type } = action

  switch (type) {
    case COUNTRY_CLEAR: {
      return { ...state, item: initialState }
    }
    case FETCH_COUNTRY_FAILURE: {
      return { ...state, err }
    }
    case FETCH_COUNTRY_SUCCESS: {
      return { ...state, item }
    }
    default: {
      return state
    }
  }
}
