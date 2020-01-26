import React from 'react'
import { compose } from 'recompose'

import Search from './search'
import SearchResults from './searchResults'

const Page = (props) => (
  <div className="wrapper">
    <h1>Country Search</h1>
    <Search {...props} />
    <SearchResults {...props} />
  </div>
)

export default compose()(Page)
