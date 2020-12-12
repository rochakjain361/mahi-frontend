import {
  GET_ALL_CAUSES,
  GET_MORE_CAUSES,
  CAUSE_API_ERROR,
  GET_CAUSES_PENDING,
  GET_MORE_CAUSES_PENDING,
  GET_CAUSE_PENDING,
  GET_CAUSE,
  CREATE_CAUSE_PENDING,
  UPDATE_LIKE_USER,
  UPDATE_LIKE_USER_ON_ACTIVE_CAUSE,
  UPDATE_LIKE_USER_PENDING
} from '../actions/CauseActionsType'

const initialPendingState = {
  getCausesPending: false,
  getMoreCausesPending: false,
  getCausePending: false,
  createCausePending: false,
  updateLikeUserPending: false
}

const initialCauses = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

const initialState = {
  ...initialPendingState,
  Causes: { ...initialCauses },
  activeCause: {}
}
const causeReducer = (state = initialState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case GET_ALL_CAUSES:
      return { ...state, Causes: payload }
    case GET_MORE_CAUSES:
      return {
        ...state,
        Causes: {
          ...payload,
          results: [...state.Causes.results, ...payload.results]
        }
      }
    case GET_CAUSE:
      return { ...state, activeCause: payload }
    case GET_CAUSES_PENDING:
      return { ...state, getCausesPending: payload }
    case GET_MORE_CAUSES_PENDING:
      return { ...state, getMoreCausesPending: payload }
    case GET_CAUSE_PENDING:
      return { ...state, getCausePending: payload }
    case CREATE_CAUSE_PENDING:
      return { ...state, createCausePending: payload }
    case CAUSE_API_ERROR:
      return { ...state, error: error }
    case UPDATE_LIKE_USER:
      return {
        ...state,
        Causes: {
          ...state.Causes,
          results: state.Causes.results.map(el =>
            el.id === payload.id
              ? {
                  ...el,
                  liked_by: payload.liked_by,
                  supporter_count: payload.supporter_count
                }
              : el
          )
        }
      }
    case UPDATE_LIKE_USER_ON_ACTIVE_CAUSE:
      return {
        ...state,
        activeCause: {
          ...state.activeCause,
          liked_by: payload.liked_by,
          supporter_count: payload.supporter_count
        }
      }
    case UPDATE_LIKE_USER_PENDING:
      return { ...state, updateLikeUserPending: payload }
    default:
      return state
  }
}
export default causeReducer
