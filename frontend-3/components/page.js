import React from 'react'
import { compose } from 'recompose'

import Filter from './filter'
import FilterResults from './filterResults'

class Page extends React.Component {
  componentDidMount() {
    const { fetchCountries } = this.props

    fetchCountries()
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Country Filter</h1>
        <Filter {...this.props} />
        <FilterResults {...this.props} />
      </div>
    )
  }
}

export default compose()(Page)
