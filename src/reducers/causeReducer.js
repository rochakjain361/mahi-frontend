import {
  GET_ALL_CAUSES,
  CAUSE_API_ERROR,
  GET_CAUSES_PENDING
} from '../actions/CauseActionsType'

const initialPendingState = {
  getCausesPending: false
}

const initialState = {
  ...initialPendingState,
  Causes: []
}
const causeReducer = (state = initialState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case GET_ALL_CAUSES:
      return { ...state, Causes: payload }
    case GET_CAUSES_PENDING:
      return { ...state, getCausesPending: payload }
    case CAUSE_API_ERROR:
      return { ...state, error: error }
    default:
      return state
  }
}
export default causeReducer
