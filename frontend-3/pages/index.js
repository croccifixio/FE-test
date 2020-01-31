import { compose } from 'recompose'
import { connect } from 'react-redux'

import Page from '../containers/page'
import { fetchCountries, fetchCountriesSuccess } from '../actions'
import '../styles/main.styl'

const Index = compose()(Page)

Index.getInitialProps = async ({ req }) => ({
  isServer: !!req
})

export default connect()(Index)
