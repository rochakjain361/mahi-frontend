import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

import { send_phone_otp, verify_phone_otp } from './phoneLogin'
import { google_sign_in } from './googleLogin'
import { fb_sign_in } from './fbLogin'
import {logout} from './logout'
import {delete_user} from './delete'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

// TODO: Handle exceptions like account exists with different credentials
export default function Login () {
  const classes = useStyles()
  const [phone_number, set_phone_number] = useState(null)
  const [otp, set_otp] = useState(null)

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('reCaptcha')
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId
    })
  }, [])

  const handle_phone_change = event => {
    set_phone_number(event.target.value)
  }

  const handle_otp_change = event => {
    set_otp(event.target.value)
  }

  const send_otp = () => {
    var appVerifier = window.recaptchaVerifier
    window.confirmationResult = send_phone_otp(phone_number, appVerifier)
  }

  const verify_otp = () => {
    verify_phone_otp(window.confirmationResult, otp)
  }

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <TextField
        id='mahi_phone_number'
        label='Phone number'
        variant='outlined'
        onChange={handle_phone_change}
      />
      <div id='reCaptcha' />
      <Button variant='contained' onClick={send_otp}>
        Send OTP
      </Button>
      <TextField
        id='mahi_otp'
        label='OTP'
        variant='outlined'
        onChange={handle_otp_change}
      />
      <Button variant='contained' onClick={verify_otp}>
        Verify OTP
      </Button>
      <Button variant='contained' onClick={google_sign_in}>
        Google sign in
      </Button>
      <Button variant='contained' onClick={fb_sign_in}>
        Facebook sign in
      </Button>
      <Button variant='contained' onClick={logout}>
        Logout
      </Button>
      <Button variant='contained' onClick={delete_user}>
        Delete account
      </Button>
    </form>
  )
}
