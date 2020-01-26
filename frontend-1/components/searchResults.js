import { compose } from 'recompose'

import Card from './card'

const SearchResults = ({ item: country }) => (
  <div className="results">
    {country.name &&
      <Card
        capital={country.capital}
        continent={country.continent}
        languages={country.languages}
        name={country.name}
        tlds={country.tlds}
      />
    }
  </div>
)

export default compose()(SearchResults)
