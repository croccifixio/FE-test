import { useEffect, useState } from 'react'
import { useDebounce } from 'use-lodash-debounce'

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState({})
  const [isSearching, setIsSearching] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 400)

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true)
        searchCharacters(debouncedSearchTerm).then(results => {
          setIsSearching(false)
          setResults(results)
        })
      } else {
        setResults({})
      }
    }, [debouncedSearchTerm]
  )

  return (
    <div>
      <input type="search" onChange={() => setSearchTerm(event.target.value)} />

      {isSearching &&
        <div>Searching...</div>
      }

      {!isSearching && Object.keys(results).length > 0 &&
        <div>
          <h2>{results.name}</h2>
          <h3>{results.capital}</h3>
          <h4>{results.continent}</h4>
          <p>Languages:</p>
          <ul>
            {results.languages.map(language => (<li>{language}</li>))}
          </ul>
          <p>TLDs:</p>
          <ul>
            {results.tlds.map(tld => (<li>{tld}</li>))}
          </ul>
        </div>
      }
    </div>
  )
}

function searchCharacters(search) {
  return fetch(`http://localhost:3002/countries/${search}`)
    .then(response => response.json())
    .catch(error => console.error(`error =>`, error))
}

export default Input
