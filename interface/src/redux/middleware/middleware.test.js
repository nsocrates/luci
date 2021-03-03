import configureStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import api from './api'
import CALL_API from '../constants/callApi'
import { USER } from '../constants/actionTypes'
const BASE_URL = process.env.REACT_APP_BASE_URL

const mockStore = configureStore()

describe('api middleware', () => {
  const next = payload => payload
  const store = mockStore()
  const invoke = action => api(store)(next)(action)

  beforeAll(() => {
    fetchMock.restore()
  })

  it('returns a payload if fetch succeeds', async () => {
    fetchMock.getOnce(BASE_URL + '/users', { body: [] })

    const action = {
      [CALL_API]: {
        method: 'GET',
        endpoint: '/users',
        types: {
          request: USER.LIST.REQUEST,
          success: USER.LIST.SUCCESS,
          failure: USER.LIST.FAILURE,
        },
      },
    }

    const expectedAction = { type: USER.LIST.SUCCESS, payload: [] }
    const response = await invoke(action)
    expect(response).toMatchObject(expectedAction)
  })

  it('returns an error if fetch fails', async () => {
    fetchMock.getOnce(BASE_URL + '/bad', 404)

    const action = {
      [CALL_API]: {
        method: 'GET',
        endpoint: '/bad',
        types: {
          request: USER.LIST.REQUEST,
          success: USER.LIST.SUCCESS,
          failure: USER.LIST.FAILURE,
        },
      },
    }

    const expectedAction = { type: USER.LIST.FAILURE, error: '404 - Not Found' }
    const response = await invoke(action)
    expect(response).toMatchObject(expectedAction)
  })
})

