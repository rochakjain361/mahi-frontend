import { combineReducers } from 'redux'
import exampleReducer from './exampleReducer'
import causeReducer from './causeReducer'

const rootReducers = combineReducers({
  causes: causeReducer
})

export default rootReducers
