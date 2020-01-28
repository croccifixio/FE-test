import React from 'react'
import { compose } from 'recompose'

import Points from './points'
import Slots from './slots'
import Spin from './spin'

const Page = (props) => (
  <div className="wrapper">
    <h1>Slot Machine</h1>
    <Points {...props} />
    <Slots {...props} />
    <Spin {...props} />
  </div>
)

export default compose()(Page)
