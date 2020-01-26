import { compose } from 'recompose'

import Card from './card'

const SearchResults = ({ data: countries }) => (
  <div className="results">
    {countries.map((country, index) =>
      <Card
        capital={country.capital}
        continent={country.continent}
        key={index}
        languages={country.languages}
        name={country.name}
        tlds={country.tlds}
      />
    )}
  </div>
)

export default compose()(SearchResults)
