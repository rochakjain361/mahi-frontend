import apiClient from '../helpers/apiClient'
import { EXTRA_APIS } from '../urls'

import {
    GET_ALL_TAGS,
    GET_TAGS_PENDING,
    EXTRA_API_ERROR,
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
  