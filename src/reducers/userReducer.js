import {
    GET_LOGGEDINUSER,
    GET_LOGGEDINUSER_PENDING,
    USER_API_ERROR
} from '../actions/UserActionsType'
  
  const initialPendingState = {
    getLoggedinuserPending: false
  }
  
  const initialState = {
    ...initialPendingState,
    Loggedinuser: null
  }
  const userReducer = (state = initialState, action) => {
    const { type, payload, error } = action
    switch (type) {
      case GET_LOGGEDINUSER:
        return { ...state, Loggedinuser: payload }
      case GET_LOGGEDINUSER_PENDING:
        return { ...state, getLoggedinuserPending: payload }
      case USER_API_ERROR:
        return { ...state, error: error }
      default:
        return state
    }
  }
  export default userReducer
  