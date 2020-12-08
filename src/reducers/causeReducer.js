import {
  GET_ALL_CAUSES,
  CAUSE_API_ERROR,
  GET_CAUSES_PENDING,
  GET_CAUSE_PENDING,
  GET_CAUSE,
  CREATE_CAUSE_PENDING,
  UPDATE_LIKE_BUTTON
} from '../actions/CauseActionsType'

const initialPendingState = {
  getCausesPending: false,
  getCausePending: false,
  createCausePending: false
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
    case CREATE_CAUSE_PENDING:
      return { ...state, createCausePending: payload }
    case CAUSE_API_ERROR:
      return { ...state, error: error }
    case UPDATE_LIKE_BUTTON:
      return {
        ...state,
        Causes: state.Causes.map(el =>
          el.id === payload.id
            ? {
                ...el,
                liked_users: payload.liked_users,
                supporter_count: payload.supporter_count
              }
            : el
        )
      }
    default:
      return state
  }
}
export default causeReducer
