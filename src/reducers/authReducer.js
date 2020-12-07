import {
  CREATING_ACCOUNT,
  GET_AUTHENTICATION_STATUS,
  GET_LOGGEDINUSER,
  GET_LOGGEDINUSER_PENDING,
  SIGNING_IN,
  AUTH_ERROR
} from '../actions/AuthActionTypes'

const initialCreatingStatus = { creatingAccount: false }

const initialSigningStatus = { signingIn: false }

const initialAuthenticationStatus = { isAuthenticated: false }

const initialPendingState = {
  getLoggedinuserPending: false
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
    case AUTH_ERROR:
      return { ...state, error: error }
    default:
      return state
  }
}

export default AuthReducer
