// https://redux.js.org/recipes/writing-tests#connected-components
import React from 'react'
import thunk from 'redux-thunk'
import { render as rtlRender } from '@testing-library/react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import reducer from '../redux/reducers'
import { api } from '../redux/middleware'

const middlewareEnhancer = applyMiddleware(thunk, api)

function configureStore(initialState) {
  return createStore(reducer, initialState, middlewareEnhancer)
}

const Wrapper = store => ({ children }) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
)

function render(
  ui,
  { initialState, store = configureStore(initialState), ...renderOptions } = {}
) {
  return rtlRender(ui, { wrapper: Wrapper(store), ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
