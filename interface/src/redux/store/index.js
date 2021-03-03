import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { api } from '../middleware'
import rootReducer from '../reducers'

function configureStore(preloadedState) {
  const middlewareEnhancer = applyMiddleware(thunk, api, logger)
  const store = createStore(rootReducer, preloadedState, middlewareEnhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

export default configureStore
