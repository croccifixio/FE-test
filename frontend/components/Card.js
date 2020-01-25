import PropTypes from "prop-types"

const Card = (props) => (
  <div className="card">
    <h2 className="title">{props.name}</h2>
    <div className="subtitle">{props.capital}</div>
    <div className="tag">{props.continent}</div>
    <div className="lists">
      <div className="list">
        <div>Languages:</div>
        <ul>
          {props.languages.map(language => (<li>{language}</li>))}
        </ul>
      </div>
      <div className="list">
        <div>TLDs:</div>
        <ul>
          {props.tlds.map(tld => (<li>{tld}</li>))}
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

export default Card
