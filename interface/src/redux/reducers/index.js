import { combineReducers } from 'redux'
import users from './users'
import requests from './requests'

const rootReducer = combineReducers({ users, requests })

export default rootReducer
