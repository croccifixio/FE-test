import { useEffect, useState } from 'react'
import { compose } from 'recompose'
import { useDebounce } from 'use-lodash-debounce'

const splitSearchTerms = (searchTerms) => searchTerms
  .split(',')
  .map(string => string.trim())
  .filter(string => string.length > 0)

const Search = (props) => {
  const { clearCountries, clearSearchTerms, fetchCountries } = props
  const [searchTerms, setSearchTerms] = useState('')
  const debouncedSearchTerms = useDebounce(searchTerms, 400)

  useEffect(
    () => {
      if (debouncedSearchTerms) {
        fetchCountries(splitSearchTerms(debouncedSearchTerms))
      } else {
        clearCountries()
        clearSearchTerms()
      }
    }, [debouncedSearchTerms]
  )

  return (
    <form className="form">
      <p>Search for multiple countries by separating search terms with a comma (e.g. "austr, republic of, united")</p>
      <input type="search" onChange={() => setSearchTerms(event.target.value)} />
    </form>
  )
}

export default compose()(Search)
