import thunkMiddleware from 'redux-thunk'
import {
  createStore,
  applyMiddleware,
  compose,
  Store as ReduxStore,
} from 'redux'
import { createLogger } from 'redux-logger'
import reducers, { initialState } from './reducers'

const dev = process.env.NODE_ENV !== 'production'

export default (state = initialState) => {
  const middlewares = dev ? [thunkMiddleware, createLogger()] : []

  return createStore(reducers, state, compose(applyMiddleware(...middlewares)))
}
