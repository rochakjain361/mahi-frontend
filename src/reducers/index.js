import { combineReducers } from 'redux'
import exampleReducer from './exampleReducer'
import causeReducer from './causeReducer'
import extraReducer from './extraReducer'
import OTPReducer from './otpReducer'
import AuthReducer from './authReducer'

const rootReducers = combineReducers({
  causes: causeReducer,
  extras: extraReducer,
  OTP: OTPReducer,
  auth: AuthReducer
})

export default rootReducers
