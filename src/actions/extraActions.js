import { apiClient } from '../helpers/apiClient'
import { EXTRA_APIS } from '../urls'

import {
  GET_ALL_TAGS,
  GET_TAGS_PENDING,
  EXTRA_API_ERROR,
  SET_TAG,
  SET_ORDERING,
  SHOW_PENDING_CAUSE,
  ADD_SUGGESTION_PENDING,
  ADD_ACTIVITY_PENDING,
  ADD_DONATION_PENDING
} from './extraActionsType'

const apiDispatch = (actionType = '', data) => {
  return {
    type: actionType,
    payload: data
  }
}

const apiError = error => {
  return {
    type: EXTRA_API_ERROR,
    error
  }
}

export const getAllTags = () => {
  const url = `${EXTRA_APIS.tags}`
  return dispatch => {
    dispatch(apiDispatch(GET_TAGS_PENDING, true))
    apiClient
      .get(url)
      .then(res => {
        dispatch(apiDispatch(GET_TAGS_PENDING, false))
        dispatch(apiDispatch(GET_ALL_TAGS, res.data))
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(GET_TAGS_PENDING, false))
      })
  }
}

export const addSuggestion = (formdata, callback = () => {}) => {
  const url = `${EXTRA_APIS.suggestion}/`
  return dispatch => {
    dispatch(apiDispatch(ADD_SUGGESTION_PENDING, true))
    apiClient
      .post(url, formdata)
      .then(res => {
        dispatch(apiDispatch(ADD_SUGGESTION_PENDING, false))
        callback()
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(ADD_SUGGESTION_PENDING, false))
      })
  }
}

export const addDonation = (formdata,callback = () => {}) => {
  const url = `${EXTRA_APIS.donation}/`
  return dispatch => {
    dispatch(apiDispatch(ADD_DONATION_PENDING, true))
    apiClient
      .post(url, formdata)
      .then(res => {
        dispatch(apiDispatch(ADD_DONATION_PENDING, false))
        callback()
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(ADD_DONATION_PENDING, false))
      })
  }
}

export const addActivity = (formdata,callback = () => {}) => {
  const url = `${EXTRA_APIS.activity}/`
  return dispatch => {
    dispatch(apiDispatch(ADD_ACTIVITY_PENDING, true))
    apiClient
      .post(url, formdata)
      .then(res => {
        dispatch(apiDispatch(ADD_ACTIVITY_PENDING, false))
        callback()
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(ADD_ACTIVITY_PENDING, false))
      })
  }
}

export const setTag = tag => {
  return dispatch => {
    dispatch(apiDispatch(SET_TAG, tag))
  }
}

export const setOrdering = order => {
  return dispatch => {
    dispatch(apiDispatch(SET_ORDERING, order))
  }
}

export const showPendingCause = pending => {
  return dispatch => {
    dispatch(apiDispatch(SHOW_PENDING_CAUSE, pending))
  }
}
