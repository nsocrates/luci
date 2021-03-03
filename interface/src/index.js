import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import reportWebVitals from './reportWebVitals'
import configureStore from './redux/store'
import './index.css'
import 'typeface-roboto'

const preloadedState = {
  users: [],
}
const store = configureStore(preloadedState)

const renderApp = () =>
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )

if (module.hot) {
  module.hot.accept('./containers/App', renderApp)
}

renderApp()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
