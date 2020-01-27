import { useEffect, useState } from 'react'
import { compose } from 'recompose'
import { useDebounce } from 'use-lodash-debounce'

const Filter = (props) => {
  const { fetchCountries, filterCountries, resetFilteredCountries } = props
  const [filterTerm, setFilterTerm] = useState('')
  const debouncedFilterTerm = useDebounce(filterTerm, 400)

  useEffect(
    () => {
      if (debouncedFilterTerm) {
        filterCountries(debouncedFilterTerm)
      } else {
        resetFilteredCountries()
      }
    }, [debouncedFilterTerm]
  )

  return (
    <form className="form">
      <label>Type to filter countries by name</label>
      <input type="search" onChange={(event) => setFilterTerm(event.target.value)} />
    </form>
  )
}

export default compose()(Filter)
