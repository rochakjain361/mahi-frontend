import { apiClient } from '../helpers/apiClient'
import { CAUSE_APIS } from '../urls'

import {
  GET_ALL_CAUSES,
  GET_CAUSES_PENDING,
  CAUSE_API_ERROR,
  GET_CAUSE_PENDING,
  GET_CAUSE
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

export const getAllCauses = tag => {
  const url = tag
    ? `${CAUSE_APIS.CauseItems}?tag=${tag}`
    : `${CAUSE_APIS.CauseItems}`
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

export const getCause = id => {
  const url =`${CAUSE_APIS.CauseItems}/${id}`
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
