import { compose } from 'recompose'
import { connect } from 'react-redux'

import Page from '../containers/page'
import { setCountry } from '../actions'
import '../styles/main.styl'

const Index = compose()(Page)

Index.getInitialProps = ({ req }) => ({
  isServer: !!req
})

export default connect()(Index)
