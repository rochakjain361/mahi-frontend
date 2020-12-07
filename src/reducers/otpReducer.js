import {
  GET_OTP_PENDING,
  GET_OTP_SENDING,
  GET_CONFIRMATION_RESULT,
  CLEAN_OTP,
  OTP_ERROR,
  GET_PHONE_NUMBER_EXISTS
} from '../actions/AuthActionTypes'

const initialSendingState = { otpSending: null }

const initialPendingState = { otpPending: null }

const initialCheckPhoneState = { phoneNumberExists: null }

const initialState = {
  ...initialPendingState,
  ...initialSendingState,
  ...initialCheckPhoneState,
  confirmationResult: null,
  error: null
}

const OTPReducer = (state = initialState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case GET_OTP_SENDING:
      return { ...state, otpSending: payload }
    case GET_OTP_PENDING:
      return { ...state, otpPending: payload }
    case GET_CONFIRMATION_RESULT:
      return { ...state, confirmationResult: payload }
    case GET_PHONE_NUMBER_EXISTS:
      return { ...state, phoneNumberExists: payload }
    case OTP_ERROR:
      return { ...state, error: error }
    case CLEAN_OTP:
      return { ...initialState }
    default:
      return state
  }
}

export default OTPReducer
