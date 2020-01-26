import { compose } from 'recompose'
import PropTypes from 'prop-types'

const Card = (country) => (
  <div className="card">
    <h2 className="title">{country.name}</h2>
    <div className="subtitle">{country.capital}</div>
    <div className="tag">{country.continent}</div>
    <div className="lists">
      <div className="list">
        <div>Languages:</div>
        <ul>
          {country.languages.map(language => (<li className="language" key={language}>{language}</li>))}
        </ul>
      </div>
      <div className="list">
        <div>TLDs:</div>
        <ul>
          {country.tlds.map(tld => (<li className="tld" key={tld}>{tld}</li>))}
        </ul>
      </div>
    </div>
  </div>
)

Card.propTypes = {
  capital: PropTypes.string.isRequired,
  continent: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  tlds: PropTypes.array.isRequired,
}

Card.defaultProps = {
  capital: '',
  continent: '',
  languages: [],
  name: '',
  tlds: [],
}

export default compose()(Card)
