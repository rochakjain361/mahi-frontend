import { apiAuthClient } from '../helpers/apiClient'
import { USER_APIS } from '../urls'

import {
  GET_LOGGEDINUSER,
  GET_LOGGEDINUSER_PENDING,
  USER_API_ERROR
} from './UserActionsType'

const apiDispatch = (actionType = '', data) => {
  return {
    type: actionType,
    payload: data
  }
}

const apiError = error => {
  return {
    type: USER_API_ERROR,
    error
  }
}

export const getLoggedInUserInfo = () => {
  const url = `${USER_APIS.whoami}`
  return dispatch => {
    dispatch(apiDispatch(GET_LOGGEDINUSER_PENDING, true))
    apiAuthClient
      .get(url)
      .then(res => {
        dispatch(apiDispatch(GET_LOGGEDINUSER_PENDING, false))
        dispatch(apiDispatch(GET_LOGGEDINUSER, res.data))
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(GET_LOGGEDINUSER_PENDING, false))
      })
  }
}
