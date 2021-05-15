import { toast } from 'react-toastify'
import {
  CREATING_ACCOUNT,
  GET_AUTHENTICATION_STATUS,
  GET_LOGGEDINUSER,
  GET_LOGGEDINUSER_PENDING,
  SIGNING_IN,
  SIGNING_OUT,
  CLEAR_USER,
  AUTH_ERROR,
  SENDING_EMAIL,
  VERIFY_EMAIL_PENDING,
  UPDATE_USER_PENDING,
} from '../actions/AuthActionTypes'

const initialCreatingStatus = { creatingAccount: false }

const initialSigningStatus = { signingIn: false, signingOut: false }

const initialAuthenticationStatus = { isAuthenticated: false }

const initialPendingState = {
  getLoggedinuserPending: false,
  sendEmailPending: false,
  updateUserPending: false,
  verifyEmailPending: false,
}

const initialState = {
  ...initialCreatingStatus,
  ...initialAuthenticationStatus,
  ...initialPendingState,
  ...initialSigningStatus,
  Loggedinuser: null
}

const AuthReducer = (state = initialState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case SIGNING_IN:
      return { ...state, signingIn: payload }
    case CREATING_ACCOUNT:
      return { ...state, creatingAccount: payload }
    case GET_AUTHENTICATION_STATUS:
      return { ...state, isAuthenticated: payload }
    case GET_LOGGEDINUSER:
      return { ...state, Loggedinuser: payload }
    case GET_LOGGEDINUSER_PENDING:
      return { ...state, getLoggedinuserPending: payload }
    case SIGNING_OUT:
      return { ...state, signingOut: payload }
    case CLEAR_USER:
      return { ...initialState }
    case SENDING_EMAIL: 
      return { ...state, sendEmailPending: payload }
    case VERIFY_EMAIL_PENDING:
      return { ...state, verifyEmailPending: payload }
    case UPDATE_USER_PENDING:
      return { ...state, updateUserPending: payload }
    case AUTH_ERROR:
      return { ...state, error: error }
    default:
      return state
  }
}

export default AuthReducer
