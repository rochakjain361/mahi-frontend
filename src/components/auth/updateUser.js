import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

import {apiAuthClient} from '../../helpers/apiClient'

export default function UpdateUser () {
  const [user, setUser] = useState(null)
  const [first_name, setFirstName] = useState(null)
  const [last_name, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone_number, setPhoneNumber] = useState(null)
  const [email_verified, setEmailVerified] = useState(true)
  useEffect(() => {
    apiAuthClient
      .get('/who_am_i')
      .then(response => {
        console.log(response)
        setUser(response.data)
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            console.log('signed in')
            // User is signed in.
          } else {
            console.log('not signed in')
            // No user is signed in.
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name)
      setLastName(user.last_name)
      setEmail(user.email)
      setPhoneNumber(user.phone_number)
      setEmailVerified(user.email_verified)
    }
  }, [user])

  const verify_email = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user
          .sendEmailVerification()
          .then(() => {
            // Email sent.
            console.log('email sent')
            apiAuthClient.post('/sync_with_firebase/',{})
            .then(response =>{
              console.log(response)
              let data = response.data
              setEmailVerified(data.email_verified)
            })
          })
          .catch(error => {
            // An error happened.
            console.log(error)
          })
        // User is signed in.
      } else {
        console.log('not signed in')
        // No user is signed in.
      }
    })
  }

  // If email is changed, user be logged out of firebase. This is not handled yet
  // Possible Solutions:
  // 1. Handle firebase user update from frontend
  // 2. Prompt the user to login again after update
  const update_profile = () => {
    const data = {
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      email: email
    }
    apiAuthClient
      .patch('/update_user/', data)
      .then(response => {
        console.log(response)
        apiAuthClient
          .get('/who_am_i')
          .then(response => {
            console.log(response)
            setUser(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <React.Fragment>
      <h3>{`Welcome ${first_name ? first_name : ''}`}</h3>
      <form>
        <div>
          <TextField
            id='mahi_first_name'
            label='First Name'
            variant='outlined'
            value={first_name ? first_name : ''}
            disabled={user ? user.sign_in_provider !== 'phone' : true}
            onChange={event => {
              setFirstName(event.target.value)
            }}
          />
        </div>
        <br />
        <div>
          <TextField
            id='mahi_last_name'
            label='Last Name'
            variant='outlined'
            value={last_name ? last_name : ''}
            disabled={user ? user.sign_in_provider !== 'phone' : true}
            onChange={event => {
              setLastName(event.target.value)
            }}
          />
        </div>
        <br />
        <div>
          <TextField
            id='mahi_email'
            label='Email'
            variant='outlined'
            value={email ? email : ''}
            disabled={user ? user.sign_in_provider !== 'phone' : true}
            onChange={event => {
              setEmail(event.target.value)
            }}
          />
        </div>
        {user
          ? !email_verified &&
            email && <div onClick={verify_email}>{`verify email`}</div>
          : ''}
        <br />
        <div>
          <TextField
            id='mahi_phone'
            label='Phone'
            variant='outlined'
            value={phone_number ? (phone_number ? phone_number : '') : ''}
            disabled={user ? user.sign_in_provider === 'phone' : true}
            onChange={event => {
              setPhoneNumber(event.target.value)
            }}
          />
        </div>
        <br />
        <div>
          <Button variant='contained' onClick={update_profile}>
            Update Profile
          </Button>
        </div>
      </form>
    </React.Fragment>
  )
}
