import {
  FETCH_COUNTRIES_SUCCESS,
  FILTER_COUNTRIES,
  FILTER_COUNTRIES_RESET,
} from '../constants/actionTypes'

export const initialState = {
  countries: [],
  filteredCountries: [],
  filterTerm: [],
}

export default (state = initialState, action) => {
  const { countries, filterTerm, type } = action

  switch (type) {
    case FETCH_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countries,
        filteredCountries: countries,
      }
    }

    case FILTER_COUNTRIES: {
      const re = new RegExp(filterTerm, 'i')

      return {
        ...state,
        filteredCountries: state.countries.filter((country) => re.test(country.name))
      }
    }

    case FILTER_COUNTRIES_RESET: {
      return {
        ...state,
        filteredCountries: state.countries,
      }
    }

    default: {
      return state
    }
  }
}
