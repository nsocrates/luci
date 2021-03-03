import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import api from '../middleware/api'
import { USER } from '../constants/actionTypes'
import users from './users'

const BASE_URL = process.env.REACT_APP_BASE_URL
const middleware = [thunk, api]
const mockStore = configureStore(middleware)

describe('user actions', () => {
  beforeAll(() => {
    fetchMock.restore()
  })

  it('fires a list action', async () => {
    const mockUsers = [{ id: 1, name: 'Kelly', group: 'USER', state: 'ACTIVE' }]
    fetchMock.getOnce(BASE_URL + '/users', { body: mockUsers })

    const store = mockStore({ users: [] })
    const expectedActions = [
      { type: USER.LIST.REQUEST },
      { type: USER.LIST.SUCCESS, payload: mockUsers },
    ]
    await users.list()(store.dispatch)
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('fires a create action', async () => {
    const mockUser = { id: 2, name: 'Kelly', group: 'USER', state: 'ACTIVE' }
    fetchMock.postOnce(BASE_URL + '/user', { body: mockUser })

    const store = mockStore()
    const expectedActions = [
      { type: USER.CREATE.REQUEST, payload: mockUser },
      { type: USER.CREATE.SUCCESS, payload: mockUser },
    ]

    await users.create(mockUser)(store.dispatch)
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('fires an update action', async () => {
    const store = mockStore({
      users: [
        {
          id: 1,
          name: 'Sarah',
          group: 'ENGINEERING',
          state: 'ACTIVE',
        },
      ],
    })
    const updates = {
      id: 1,
      data: {
        name: 'John',
        group: 'USER',
        state: 'INACTIVE',
      },
    }

    fetchMock.putOnce(BASE_URL + '/user/' + updates.id, { body: updates.data })

    const expectedActions = [
      { type: USER.UPDATE.REQUEST, id: updates.id, payload: updates.data },
      { type: USER.UPDATE.SUCCESS, id: updates.id, payload: updates.data },
    ]

    await users.update(updates)(store.dispatch)
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('fires a destroy action', async () => {
    const mockUsers = [{ id: 1, name: 'Kelly', group: 'USER', state: 'ACTIVE' }]
    const store = mockStore({ users: mockUsers })
    fetchMock.deleteOnce(BASE_URL + '/user/1', {})
    const expectedActions = [
      { type: USER.DESTROY.REQUEST, id: 1 },
      { type: USER.DESTROY.SUCCESS, id: 1, payload: {} },
    ]
    await users.destroy(1)(store.dispatch)
    expect(store.getActions()).toEqual(expectedActions)
  })
})
