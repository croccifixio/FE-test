import { compose } from 'recompose'
import { connect } from 'react-redux'

import Page from '../containers/page'
import '../styles/main.styl'

const Index = compose()(Page)

Index.getInitialProps = async ({ store, req }) => ({
  isServer: !!req
})

export default connect()(Index)
