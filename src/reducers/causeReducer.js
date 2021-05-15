import { toast } from 'react-toastify'
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
  UPDATE_LIKE_USER_PENDING,
  WHITELIST_CAUSE_PENDING,
  GET_MORE_SUGGESTIONS,
  GET_MORE_SUGGESTIONS_PENDING,
  GET_MORE_ACTIVITIES,
  GET_MORE_ACTIVITIES_PENDING,
  GET_SIMILAR_CAUSES,
  GET_SIMILAR_CAUSES_PENDING,
  GET_MORE_SIMILAR_CAUSES,
  GET_MORE_SIMILAR_CAUSES_PENDING
} from '../actions/CauseActionsType'

const initialPendingState = {
  getCausesPending: false,
  getMoreCausesPending: false,
  getCausePending: false,
  createCausePending: false,
  updateLikeUserPending: false,
  whitelistCausePending: false,
  getMoreSuggestionsPending: false,
  getMoreActivitiesPending: false,
  getSimilarCausesPending: false,
  getMoreSimilarCausesPending: false
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
  activeCause: {},
  similarCauses: { ...initialCauses }
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
        },
        similarCauses: {
          ...state.similarCauses,
          results: state.similarCauses.results.map(el =>
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
    case WHITELIST_CAUSE_PENDING:
      return { ...state, whitelistCausePending: payload }
    case GET_MORE_SUGGESTIONS:
      return {
        ...state,
        activeCause: {
          ...state.activeCause,
          moreSuggestions: payload
        }
      }
    case GET_SIMILAR_CAUSES:
      return { ...state, similarCauses: payload }
    case GET_MORE_SIMILAR_CAUSES:
      return {
        ...state,
        similarCauses: {
          ...payload,
          results: [...state.similarCauses.results, ...payload.results]
        }
      }
    case GET_SIMILAR_CAUSES_PENDING:
      return { ...state, getSimilarCausesPending: payload }
    case GET_MORE_SIMILAR_CAUSES_PENDING:
      return { ...state, getMoreSimilarCausesPending: payload }
    case GET_MORE_SUGGESTIONS_PENDING:
      return { ...state, getMoreSuggestionsPending: payload }
    case GET_MORE_ACTIVITIES:
      return {
        ...state,
        activeCause: {
          ...state.activeCause,
          moreActivities: payload
        }
      }
    case GET_MORE_ACTIVITIES_PENDING:
      return { ...state, getMoreActivitiesPending: payload }
    case CAUSE_API_ERROR:
      if (
        error.response &&
        error.response.status &&
        error.response.status === 403
      ) {
        toast.error('You are not authorized to perform such action', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      } else {
        toast.error('error occured while performing action', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
      return { ...state, error: error }
    default:
      return state
  }
}
export default causeReducer
