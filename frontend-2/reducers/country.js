import {
  COUNTRIES_CLEAR,
  COUNTRY_CLEAR,
  FETCH_COUNTRY_SUCCESS,
  SEARCH_TERM_CLEAR,
  SEARCH_TERM_SET,
  SEARCH_TERMS_CLEAR,
} from '../constants/actionTypes'

export const initialState = {
  data: [],
  searchTerms: [],
}

export default (state = initialState, action) => {
  const { country, err, searchTerm, type } = action

  switch (type) {
    case COUNTRIES_CLEAR: {
      return { ...state, data: initialState.data }
    }

    case COUNTRY_CLEAR: {
      return {
        ...state,
        data: state.data.filter(({ name }) => name !== country.name)
      }
    }

    case FETCH_COUNTRY_SUCCESS: {
      const duplicateCountry = state.data.find(({ name }) => name === country.name)
      const uniqueCountries = state.data.filter(({ name }) => name !== country.name)

      return {
        ...state,
        data: [
          ...uniqueCountries,
          {
            ...country,
            searchTerms: [
              ...duplicateCountry ? duplicateCountry.searchTerms : [],
              searchTerm,
            ],
          },
        ]
      }
    }

    case SEARCH_TERM_CLEAR: {
      return {
        ...state,
        searchTerms: state.searchTerms.filter((term) => term !== searchTerm),
      }
    }

    case SEARCH_TERM_SET: {
      return {
        ...state,
        searchTerms: [
          ...state.searchTerms,
          searchTerm,
        ]
      }
    }

    case SEARCH_TERMS_CLEAR: {
      return {
        ...state,
        searchTerms: initialState.searchTerms,
      }
    }

    default: {
      return state
    }
  }
}
