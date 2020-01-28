import { compose } from 'recompose'

const Points = ({ points }) => (
  <div className="points">Points: {points}</div>
)

export default compose()(Points)
