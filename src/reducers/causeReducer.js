import {
  GET_ALL_CAUSES,
  CAUSE_API_ERROR,
  GET_CAUSES_PENDING,
  GET_CAUSE_PENDING,
  GET_CAUSE
} from '../actions/CauseActionsType'

const initialPendingState = {
  getCausesPending: false,
  getCausePending: false
}

const initialState = {
  ...initialPendingState,
  Causes: [],
  activeCause: {}
}
const causeReducer = (state = initialState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case GET_ALL_CAUSES:
      return { ...state, Causes: payload }
    case GET_CAUSE:
      return { ...state, activeCause: payload }
    case GET_CAUSES_PENDING:
      return { ...state, getCausesPending: payload }
    case GET_CAUSE_PENDING:
      return { ...state, getCausePending: payload }
    case CAUSE_API_ERROR:
      return { ...state, error: error }
    default:
      return state
  }
}
export default causeReducer
