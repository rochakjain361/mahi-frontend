import apiClient from '../helpers/apiClient'
import { CAUSE_APIS } from '../urls'

import {
    GET_ALL_CAUSES,
    GET_CAUSES_PENDING,
    CAUSE_API_ERROR,
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

export const getAllCauses = () => {
    const url = `${CAUSE_APIS.CauseItems}`
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
  