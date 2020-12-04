import { combineReducers } from 'redux'
import exampleReducer from './exampleReducer'
import causeReducer from './causeReducer'
import extraReducer from './extraReducer'

const rootReducers = combineReducers({
  causes: causeReducer,
  extras: extraReducer
})

export default rootReducers
