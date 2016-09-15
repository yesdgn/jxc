import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import  * as   rootReducer from './reducers'
// import {  routerReducer } from 'react-router-redux'
// const reducer  = combineReducers({
//   ...rootReducer,
//   routing: routerReducer
// })
const reducer  = combineReducers({
  ...rootReducer
})
const loggerMiddleware = createLogger()


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}
