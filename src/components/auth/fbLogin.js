import firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'

import getCookie from '../../utils/get_cookie'

export const fb_sign_in = () => {
  var provider = new firebase.auth.FacebookAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          axios
            .post(
              'http://127.0.0.1:8000/auth/login/',
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
          console.log(error)
        })
      // The signed-in user info.
      var user = result.user
      console.log(result)
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // The email of the user's account used.
      var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential
      // ...
      console.log(error)
    })
}
