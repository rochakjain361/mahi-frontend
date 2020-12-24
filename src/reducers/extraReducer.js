import { toast } from 'react-toastify'
import {
  GET_ALL_TAGS,
  EXTRA_API_ERROR,
  GET_TAGS_PENDING,
  SET_TAG,
  SET_ORDERING,
  SHOW_PENDING_CAUSE,
  ADD_SUGGESTION_PENDING,
  ADD_DONATION_PENDING,
  ADD_ACTIVITY_PENDING
} from '../actions/extraActionsType'

const initialPendingState = {
  getTagssPending: false,
  addSuggestionPending: false,
  addDonationPending: false,
  addActivityPending: false
}

const initialState = {
  ...initialPendingState,
  Tags: [],
  tag: 0,
  ordering: '-created_on',
  show_pending_cause: false
}
const extraReducer = (state = initialState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case GET_ALL_TAGS:
      return { ...state, Tags: payload }
    case GET_TAGS_PENDING:
      return { ...state, getTagsPending: payload }
    case ADD_SUGGESTION_PENDING:
      return { ...state, addSuggestionPending: payload }
    case ADD_DONATION_PENDING:
      return { ...state, addDonationPending: payload }
    case ADD_ACTIVITY_PENDING:
      return { ...state, addActivityPending: payload }
    case SET_TAG:
      return { ...state, tag: payload }
    case SET_ORDERING:
      return { ...state, ordering: payload }
    case SHOW_PENDING_CAUSE:
      return {...state, show_pending_cause: payload}
    case EXTRA_API_ERROR:
      if(error.response.status==403){
        toast.error('You are not authorized to perform such action', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
      else{
        toast.error('error occured while performing action', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
      return { ...state, error: error }
    default:
      return state
  }
}
export default extraReducer
