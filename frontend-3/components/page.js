import React from 'react'
import { compose } from 'recompose'

import Filter from './filter'
import FilterResults from './filterResults'

const Page = (props) => (
  <div className="wrapper">
    <h1>Country Filter</h1>
    <Filter {...props} />
    <FilterResults {...props} />
  </div>
)

export default compose()(Page)
