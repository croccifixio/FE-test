import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import store from '../store'

class MyApp extends App {
  render() {
    const { store, Component, ...props } = this.props
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    )
  }
}

export default withRedux(store)(MyApp)
