import {
  GET_ALL_TAGS,
  EXTRA_API_ERROR,
  GET_TAGS_PENDING,
  SET_TAG,
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
  tag: 0
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
    case EXTRA_API_ERROR:
      return { ...state, error: error }
    default:
      return state
  }
}
export default extraReducer
