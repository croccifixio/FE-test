import { useEffect, useState } from 'react'
import { compose } from 'recompose'
import { useDebounce } from 'use-lodash-debounce'

const Search = (props) => {
  const { clearCountry, fetchCountry } = props
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 400)

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        fetchCountry(debouncedSearchTerm)
      } else {
        clearCountry()
      }
    }, [debouncedSearchTerm]
  )

  return (
    <form className="form">
      <input type="search" onChange={() => setSearchTerm(event.target.value)} />
    </form>
  )
}

export default compose()(Search)
