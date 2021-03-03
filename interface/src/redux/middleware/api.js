import { CALL_API } from '../constants'

const BASE_URL = process.env.REACT_APP_BASE_URL

// Abstract out our API calls so we don't have to fire multiple actions everytime
const api = store => next => async action => {
  const callAPI = action[CALL_API]

  // Skip this middleware if CALL_API is not defined
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { method, endpoint, types, id, data } = callAPI

  // Returns an action in accordance to the Redux actions schema
  function actionWith(payload) {
    const nextAction = { ...action, ...payload }
    delete nextAction[CALL_API]
    return nextAction
  }

  if (!types || !types.request || !types.success || !types.failure) {
    throw new Error('Action types missing')
  }

  if (!method) {
    throw new Error('HTTP method missing')
  }

  if (!endpoint) {
    throw new Error('Endpoint missing')
  }

  const options = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  if (method.toUpperCase() !== 'GET' && data) {
    options.body = JSON.stringify(data)
  }

  // This is where we do our API calls
  try {
    const requestResponse = { type: types.request }

    if (id) {
      requestResponse.id = id
    }

    if (data) {
      requestResponse.payload = data
    }

    next(actionWith(requestResponse))
    const response = await fetch(BASE_URL + endpoint, options)

    if (!response || !response.ok || response.status >= 400) {
      return next(
        actionWith({
          type: types.failure,
          error: `${response.status} - ${response.statusText}`,
        })
      )
    }

    const successResponse = { type: types.success }

    if (response.status !== 204) {
      successResponse.payload = await response.json()
    }

    if (id) {
      successResponse.id = id
    }

    return next(actionWith(successResponse))
  } catch (error) {
    console.error(error)
    return next(actionWith({ type: types.failure, error: error.message }))
  }
}

export default api
