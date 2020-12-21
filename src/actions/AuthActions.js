import { apiAuthClient } from '../helpers/apiClient'
import firebase from 'firebase/app'
import 'firebase/auth'

import { USER_APIS } from '../urls'
import {
  GET_OTP_PENDING,
  GET_OTP_SENDING,
  GET_CONFIRMATION_RESULT,
  SIGNING_IN,
  GET_AUTHENTICATION_STATUS,
  GET_PHONE_NUMBER_EXISTS,
  GET_LOGGEDINUSER,
  GET_LOGGEDINUSER_PENDING,
  AUTH_ERROR,
  OTP_ERROR,
  SIGNING_OUT,
  CLEAR_USER
} from './AuthActionTypes'

const apiDispatch = (actionType = '', data) => {
  return {
    type: actionType,
    payload: data
  }
}

const apiError = error => {
  return {
    type: AUTH_ERROR,
    error
  }
}

const otpError = error => {
  return {
    type: OTP_ERROR,
    error
  }
}

export const sendOTP = (
  phone_number,
  appVerifier,
  success_callback = message => {},
  failure_callback = message => {}
) => {
  return dispatch => {
    phone_number = `+91${phone_number.trim()}`
    let check_phone_number_url = USER_APIS.phone_number_exists
    let check_phone_number_data = { phone_number: phone_number }
    apiAuthClient
      .post(check_phone_number_url, check_phone_number_data)
      .then(response => {
        let response_data = response.data
        let phone_number_exists = response_data.phone_number_exists
        if (!phone_number_exists) {
          dispatch(apiDispatch(GET_PHONE_NUMBER_EXISTS, false))
          failure_callback('Phone number does not exist. Try creating a new account with this phone number')
        } else {
          dispatch(apiDispatch(GET_PHONE_NUMBER_EXISTS, true))
          dispatch(apiDispatch(GET_OTP_SENDING, true))
          firebase
            .auth()
            .signInWithPhoneNumber(phone_number, appVerifier)
            .then(function (confirmationResult) {
              dispatch(apiDispatch(GET_OTP_SENDING, false))
              dispatch(apiDispatch(GET_OTP_PENDING, true))
              dispatch(apiDispatch(GET_CONFIRMATION_RESULT, confirmationResult))
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
            })
            .catch(error => {
              dispatch(apiDispatch(GET_OTP_SENDING, false))
              dispatch(apiDispatch(GET_OTP_PENDING, false))
              dispatch(otpError(error))
              failure_callback('OTP not sent. Please try again later.')
              // Error; SMS not sent
              // ...
            })
        }
      })
      .catch(error => {
        dispatch(apiError(error))
        failure_callback(
          error.response
            ? error.response.error
              ? error.response.error
              : error.response.statusText
            : 'Something went wrong. Try again later'
        )
      })
  }
}

export const VerifyOTP = (
  confirmationResult,
  code,
  success_callback = message => {},
  failure_callback = message => {}
) => {
  return dispatch => {
    let login_url = USER_APIS.login
    confirmationResult
      .confirm(code)
      .then(result => {
        // User signed in successfully.
        dispatch(apiDispatch(GET_OTP_PENDING, false))
        dispatch(apiDispatch(SIGNING_IN, true))
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(idToken => {
            // Send token to your backend via HTTPS
            // ...
            const login_data = {
              token: idToken
            }
            apiAuthClient
              .post(login_url, login_data)
              .then(response => {
                let logged_in_user = response.data.user
                dispatch(apiDispatch(SIGNING_IN, false))
                dispatch(apiDispatch(GET_LOGGEDINUSER, logged_in_user))
                dispatch(apiDispatch(GET_AUTHENTICATION_STATUS, true))
                success_callback('Logged in successfully')
                window.location.href = '/'
              })
              .catch(error => {
                dispatch(apiDispatch(SIGNING_IN, false))
                dispatch(apiError(error))
                dispatch(apiDispatch(GET_AUTHENTICATION_STATUS, false))
                failure_callback(
                  error.response
                    ? error.response.error
                      ? error.response.error
                      : error.response.statusText
                    : 'Unable to login. Try again later'
                )
              })
          })
          .catch(error => {
            dispatch(apiError(error))
            failure_callback('Authentication error')
          })
        // ...
      })
      .catch(error => {
        if (error.code === 'auth/invalid-verification-code') {
          failure_callback('Invalid OTP')
        } else {
          failure_callback('Authentication error')
        }
        dispatch(otpError(error))
      })
  }
}

export const googleLogin = (
  success_callback = message => {},
  failure_callback = message => {}
) => {
  return dispatch => {
    let login_url = USER_APIS.login
    let provider = new firebase.auth.GoogleAuthProvider()
    dispatch(apiDispatch(SIGNING_IN, true))
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(idToken => {
            // Send token to your backend via HTTPS
            // ...
            const login_data = {
              token: idToken
            }
            apiAuthClient
              .post(login_url, login_data)
              .then(response => {
                let logged_in_user = response.data.user
                dispatch(apiDispatch(SIGNING_IN, false))
                dispatch(apiDispatch(GET_LOGGEDINUSER, logged_in_user))
                dispatch(apiDispatch(GET_AUTHENTICATION_STATUS, true))
                success_callback('Logged in successfully')
                window.location.href = '/'
              })
              .catch(error => {
                dispatch(apiDispatch(SIGNING_IN, false))
                dispatch(apiError(error))
                dispatch(apiDispatch(GET_AUTHENTICATION_STATUS, false))
                failure_callback(
                  error.response
                    ? error.response.error
                      ? error.response.error
                      : error.response.statusText
                    : 'Unable to login. Try again later'
                )
              })
          })
          .catch(error => {
            dispatch(apiError(error))
            dispatch(apiDispatch(SIGNING_IN, false))
            failure_callback('Authentication error')
          })
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code
        // var errorMessage = error.message
        // The email of the user's account used.
        // var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        //var credential = error.credential
        // ...
        if (error.code === 'auth/account-exists-with-different-credential') {
          failure_callback(
            'Account exists with different credentials, Please use those credentials to sign-in.'
          )
        } else {
          failure_callback('Authentication error')
        }
        dispatch(apiDispatch(SIGNING_IN, false))
        dispatch(apiError(error))
      })
  }
}

export const facebookLogin = (
  success_callback = message => {},
  failure_callback = message => {}
) => {
  return dispatch => {
    let login_url = USER_APIS.login
    let provider = new firebase.auth.FacebookAuthProvider()
    dispatch(apiDispatch(SIGNING_IN, true))
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(idToken => {
            // Send token to your backend via HTTPS
            // ...
            const login_data = {
              token: idToken
            }
            apiAuthClient
              .post(login_url, login_data)
              .then(response => {
                let logged_in_user = response.data.user
                dispatch(apiDispatch(SIGNING_IN, false))
                dispatch(apiDispatch(GET_LOGGEDINUSER, logged_in_user))
                dispatch(apiDispatch(GET_AUTHENTICATION_STATUS, true))
                success_callback('Logged in successfully')
                window.location.href = '/'
              })
              .catch(error => {
                dispatch(apiDispatch(SIGNING_IN, false))
                dispatch(apiError(error))
                dispatch(apiDispatch(GET_AUTHENTICATION_STATUS, false))
                failure_callback(
                  error.response
                    ? error.response.error
                      ? error.response.error
                      : error.response.statusText
                    : 'Unable to login. Try again later'
                )
              })
          })
          .catch(error => {
            failure_callback('Authentication error')
            dispatch(apiError(error))
            dispatch(apiDispatch(SIGNING_IN, false))
          })
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code
        // var errorMessage = error.message
        // The email of the user's account used.
        // var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        //var credential = error.credential
        // ...
        if (error.code === 'auth/account-exists-with-different-credential') {
          failure_callback(
            'Account exists with different credentials, Please use those credentials to sign-in.'
          )
        } else {
          failure_callback('Authentication error')
        }
        dispatch(apiDispatch(SIGNING_IN, false))
        dispatch(apiError(error))
      })
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
        dispatch(apiDispatch(GET_AUTHENTICATION_STATUS, true))
      })
      .catch(error => {
        dispatch(apiError(error))
        dispatch(apiDispatch(GET_LOGGEDINUSER_PENDING, false))
        dispatch(apiDispatch(GET_AUTHENTICATION_STATUS, false))
      })
  }
}

export const logout = () => {
  const url = `${USER_APIS.logout}`
  return dispatch => {
    dispatch(apiDispatch(SIGNING_OUT, true))
    firebase
      .auth()
      .signOut()
      .then(() => {
        apiAuthClient
          .post(url)
          .then(response => {
            dispatch(apiDispatch(SIGNING_OUT, false))
            dispatch(apiDispatch(CLEAR_USER, {}))
            window.location.href = '/'
          })
          .catch(error => {
            dispatch(apiDispatch(SIGNING_OUT, false))
            dispatch(apiDispatch(CLEAR_USER, {}))
            window.location.href = '/'
          })
      })
      .catch(error => {
        apiAuthClient
          .post(url)
          .then(response => {
            dispatch(apiDispatch(SIGNING_OUT, false))
            dispatch(apiDispatch(CLEAR_USER, {}))
            window.location.href = '/'
          })
          .catch(error => {
            dispatch(apiDispatch(SIGNING_OUT, false))
            dispatch(apiDispatch(CLEAR_USER, {}))
            window.location.href = '/'
          })
      })
  }
}
