import { combineReducers } from 'redux'
import exampleReducer from './exampleReducer'
import causeReducer from './causeReducer'
import extraReducer from './extraReducer'
import userReducer from './userReducer'

const rootReducers = combineReducers({
  causes: causeReducer,
  users: userReducer,
  extras: extraReducer,
})

export default rootReducers
