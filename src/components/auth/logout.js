import firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'

import getCookie from '../../utils/get_cookie'

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      axios
        .post('http://127.0.0.1:8000/auth/logout/', null, {
          withCredentials: true,
          headers: {
            'X-CSRFToken': getCookie('mahi_csrftoken'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(function (error) {
      axios
        .post('http://127.0.0.1:8000/auth/logout/', null, {
          withCredentials: true,
          headers: {
            'X-CSRFToken': getCookie('mahi_csrftoken'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    })
}
