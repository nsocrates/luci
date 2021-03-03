import { actionTypes, CALL_API } from '../constants'

const { USER } = actionTypes

// List all users
export function list() {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        method: 'GET',
        endpoint: '/users',
        types: {
          request: USER.LIST.REQUEST,
          success: USER.LIST.SUCCESS,
          failure: USER.LIST.FAILURE,
        },
      },
    })
  }
}

// Create new user
export function create(payload) {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        method: 'POST',
        endpoint: '/user',
        data: payload,
        types: {
          request: USER.CREATE.REQUEST,
          success: USER.CREATE.SUCCESS,
          failure: USER.CREATE.FAILURE,
        },
      },
    })
  }
}

// Show a user
export function show(id) {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        id,
        method: 'GET',
        endpoint: '/user/' + id,
        types: {
          request: USER.SHOW.REQUEST,
          success: USER.SHOW.SUCCESS,
          failure: USER.SHOW.FAILURE,
        },
      },
    })
  }
}

// Update a user
export function update({ id, data }) {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        id,
        data,
        method: 'PUT',
        endpoint: '/user/' + id,
        types: {
          request: USER.UPDATE.REQUEST,
          success: USER.UPDATE.SUCCESS,
          failure: USER.UPDATE.FAILURE,
        },
      },
    })
  }
}

// Delete a user
export function destroy(id) {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        id,
        method: 'DELETE',
        endpoint: '/user/' + id,
        types: {
          request: USER.DESTROY.REQUEST,
          success: USER.DESTROY.SUCCESS,
          failure: USER.DESTROY.FAILURE,
        },
      },
    })
  }
}

const exports = {
  list,
  create,
  show,
  update,
  destroy,
}

export default exports
