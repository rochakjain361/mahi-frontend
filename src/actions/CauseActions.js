import { apiClient } from '../helpers/apiClient'
import { CAUSE_APIS } from '../urls'

import {
  GET_ALL_CAUSES,
  GET_MORE_CAUSES,
  GET_CAUSES_PENDING,
  GET_MORE_CAUSES_PENDING,
  CAUSE_API_ERROR,
  GET_CAUSE_PENDING,
  GET_CAUSE,
  CREATE_CAUSE_PENDING,
  UPDATE_LIKE_USER,
  UPDATE_LIKE_USER_ON_ACTIVE_CAUSE,
  UPDATE_LIKE_USER_PENDING,
  WHITELIST_CAUSE_PENDING,
} from './CauseActionsType'

const apiDispatch = (actionType = '', data) => {
  return {
    type: actionType,
    payload: data
  }
}

const apiError = error => {
  return {
    type: CAUSE_API_ERROR,
    error
  }
}

export const getAllCauses = (tag, ordering='-created_on', pending=false) => {
  const url = tag
    ? `${CAUSE_APIS.CauseItems}?tag=${tag}&ordering=${ordering}&pending=${pending}`
    : `${CAUSE_APIS.CauseItems}?ordering=${ordering}&pending=${pending}`
  return dispatch => {
    dispatch(apiDispatch(GET_CAUSES_PENDING, true))
    apiClient
      .get(url)
      .then(res => {
        dispatch(apiDispatch(GET_CAUSES_PENDING, false))
        dispatch(apiDispatch(GET_ALL_CAUSES, res.data))
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(GET_CAUSES_PENDING, false))
      })
  }
}

export const getMoreCauses = next_url => {
  return dispatch => {
    dispatch(apiDispatch(GET_MORE_CAUSES_PENDING, true))
    apiClient
      .get(next_url)
      .then(res => {
        dispatch(apiDispatch(GET_MORE_CAUSES_PENDING, false))
        dispatch(apiDispatch(GET_MORE_CAUSES, res.data))
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(GET_MORE_CAUSES_PENDING, false))
      })
  }
}

export const getCause = id => {
  const url = `${CAUSE_APIS.CauseItems}/${id}`
  return dispatch => {
    dispatch(apiDispatch(GET_CAUSE_PENDING, true))
    apiClient
      .get(url)
      .then(res => {
        dispatch(apiDispatch(GET_CAUSE_PENDING, false))
        dispatch(apiDispatch(GET_CAUSE, res.data))
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(GET_CAUSE_PENDING, false))
      })
  }
}

export const createCause = (formdata, callback = () => {}) => {
  const url = `${CAUSE_APIS.CauseItems}/`
  return dispatch => {
    dispatch(apiDispatch(CREATE_CAUSE_PENDING, true))
    apiClient
      .post(url, formdata)
      .then(res => {
        dispatch(apiDispatch(CREATE_CAUSE_PENDING, false))
        callback()
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(CREATE_CAUSE_PENDING, false))
      })
  }
}

export const updateLikedUser = causeId => {
  const url = `${CAUSE_APIS.CauseItems}/${causeId}/update_liked_user/`
  return dispatch => {
    dispatch(apiDispatch(UPDATE_LIKE_USER_PENDING, true))
    apiClient
      .patch(url)
      .then(res => {
        dispatch(apiDispatch(UPDATE_LIKE_USER_PENDING, false))
        dispatch(apiDispatch(UPDATE_LIKE_USER, res.data))
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(UPDATE_LIKE_USER_PENDING, false))
      })
  }
}

export const updateLikedUserOnActiveCause = causeId => {
  const url = `${CAUSE_APIS.CauseItems}/${causeId}/update_liked_user/`
  return dispatch => {
    dispatch(apiDispatch(UPDATE_LIKE_USER_PENDING, true))
    apiClient
      .patch(url)
      .then(res => {
        dispatch(apiDispatch(UPDATE_LIKE_USER_PENDING, false))
        dispatch(apiDispatch(UPDATE_LIKE_USER_ON_ACTIVE_CAUSE, res.data))
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(UPDATE_LIKE_USER_PENDING, false))
      })
  }
}

export const whitelistCause = (causeId, callback = () => {} ) => {
  const url = `${CAUSE_APIS.CauseItems}/${causeId}/whitelist_cause/`
  return dispatch => {
    dispatch(apiDispatch(WHITELIST_CAUSE_PENDING, true))
    apiClient
      .patch(url)
      .then(res => {
        dispatch(apiDispatch(WHITELIST_CAUSE_PENDING, false))
        callback()
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(WHITELIST_CAUSE_PENDING, false))
      })
  }
}
