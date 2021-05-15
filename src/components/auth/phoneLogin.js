import firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'

import getCookie from '../../utils/get_cookie'
import {api_base_url} from '../../urls'

export const send_phone_otp = (phone_number, appVerifier) => {
  firebase
    .auth()
    .signInWithPhoneNumber(phone_number, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult
      return window.confirmationResult
    })
    .catch(function (error) {
      console.log(error)
      return null
      // Error; SMS not sent
      // ...
    })
}

export const verify_phone_otp = (confirmationResult, code) => {
  confirmationResult
    .confirm(code)
    .then(function (result) {
      // User signed in successfully.
      console.log(result)
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          console.log(idToken)
          // Send token to your backend via HTTPS
          // ...
          axios
            .post(
              `${api_base_url}/auth/login/`,
              { token: idToken },
              {
                withCredentials: true,
                headers: {
                  'X-CSRFToken': getCookie('mahi_csrftoken'),
                  'Content-Type': 'application/json'
                }
              }
            )
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(function (error) {
          // Handle error
        })
      // ...
    })
    .catch(function (error) {
      // User couldn't sign in (bad verification code?)
      // ...
    })
}
