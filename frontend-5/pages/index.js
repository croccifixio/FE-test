import { compose } from 'recompose'
import { connect } from 'react-redux'

import Page from '../containers/page'
import { formFields } from '../components/form'
import { setValue } from '../actions'
import '../styles/main.styl'

const Index = compose()(Page)

Index.getInitialProps = async ({ store, req }) => {
  formFields.forEach(({name}) => store.dispatch(setValue(name, '')))

  return {
    isServer: !!req
  }
}

export default connect()(Index)
