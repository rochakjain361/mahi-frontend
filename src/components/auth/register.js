import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CloseIcon from '@material-ui/icons/Close'
import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'

import { sendOTP, VerifyOTP, cleanOTP } from '../../actions/SignupActions'
import { googleLogin, facebookLogin } from '../../actions/AuthActions'
import FacebookIcon from '../../icons/fb'
import GoogleIcon from '../../icons/google'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#fff',
    padding: '0.9375rem 1.25rem',
    boxSizing: 'border-box'
  },
  closeButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  header: {
    fontSize: '1.5rem',
    marginTop: '2 rem'
  },
  wide_input: {
    width: '100%',
    marginTop: '2.25rem'
  },
  phone_number_container: {
    display: 'flex'
  },
  phone_code: {
    margin: '3.65rem 0.3rem 0 0'
  },
  custom_button: {
    color: '#fff',
    fontWeight: 500,
    background: '#6552FF',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    height: '2.75rem',
    '&:hover': {
      background: '#6552EF'
    }
  },
  custom_label: {
    fontSize: '0.875rem',
    opacity: 0.2,
    color: '#000'
  },
  divider: {
    margin: '2rem 0',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2rem'
  },
  separator: {
    width: '100%',
    height: 0,
    border: '1px solid rgba(0, 0, 0, 0.08)'
  },
  dividerContent: {
    padding: '0.5rem',
    fontSize: '0.875rem'
  },
  socialAuthContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  socialAuthButton: {
    textTransform: 'none',
    height: '2.75rem',
    padding: '1rem 1.5rem'
  },
  loader: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hiddenDiv: {
    visibility: 'hidden'
  }
}))

export default function Register () {
  const classes = useStyles()
  const [name, setName] = useState(null)
  const [phone_number, setPhoneNumber] = useState(null)
  const [otp, setOTP] = useState(null)

  const dispatch = useDispatch()

  const confirmationResult = useSelector(state => state.OTP.confirmationResult)
  const otpSending = useSelector(state => state.OTP.otpSending)
  const otpPending = useSelector(state => state.OTP.otpPending)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const creatingAccount = useSelector(state => state.auth.creatingAccount)

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('reCaptcha')
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId
    })
  }, [])

  useEffect(() => {
    return () => {
      dispatch(cleanOTP)
    }
  })

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handlePhoneChange = event => {
    setPhoneNumber(event.target.value)
  }

  const handleOTPChange = event => {
    setOTP(event.target.value)
  }

  const send_OTP = () => {
    var appVerifier = window.recaptchaVerifier
    dispatch(sendOTP(phone_number, appVerifier))
  }

  const verify_OTP = () => {
    dispatch(VerifyOTP(confirmationResult, otp, name))
  }

  const google_login = () => {
    dispatch(googleLogin())
  }

  const facebook_login = () => {
    dispatch(facebookLogin())
  }

  return (
    <React.Fragment>
      {creatingAccount ? (
        <div>
          <div className={classes.loader}>
            <CircularProgress />
          </div>
          <div id='reCaptcha' className={classes.hiddenDiv}></div>
        </div>
      ) : (
        <Paper className={classes.root} elevation={0}>
          {isAuthenticated && <Redirect to='/' />}
          <div className={classes.closeButtonContainer}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography className={classes.header}>Sign up</Typography>
          <form>
            <TextField
              onChange={handleNameChange}
              className={classes.wide_input}
              label='Name'
              InputLabelProps={{ className: classes.custom_label }}
            />
            <div className={classes.phone_number_container}>
              <span className={classes.phone_code}>+91</span>
              <TextField
                onChange={handlePhoneChange}
                className={classes.wide_input}
                label='Phone Number'
                InputLabelProps={{ className: classes.custom_label }}
              />
            </div>
            <div id='reCaptcha' style={{ marginTop: '2.25rem' }} />
            <TextField
              onChange={handleOTPChange}
              className={classes.wide_input}
              label='OTP'
              InputLabelProps={{ className: classes.custom_label }}
              style={{ display: otpPending ? 'inline-flex' : 'none' }}
            />
            <Button
              variant='contained'
              className={`${classes.custom_button} ${classes.wide_input}`}
              disableElevation
              onClick={send_OTP}
              disabled={otpPending === true ? true : false}
            >
              Send OTP
            </Button>
            <Button
              variant='contained'
              className={`${classes.custom_button} ${classes.wide_input}`}
              disableElevation
              onClick={verify_OTP}
              style={{ display: otpPending ? 'block' : 'none' }}
            >
              Verify OTP
            </Button>
          </form>
          <div className={classes.divider}>
            <div className={classes.separator} />
            <span className={classes.dividerContent}>or</span>
            <div className={classes.separator} />
          </div>
          <div className={classes.socialAuthContainer}>
            <Button
              variant='outlined'
              startIcon={<FacebookIcon />}
              className={classes.socialAuthButton}
              onClick={facebook_login}
            >
              Facebook
            </Button>
            <Button
              variant='outlined'
              startIcon={<GoogleIcon />}
              className={classes.socialAuthButton}
              onClick={google_login}
            >
              Google
            </Button>
          </div>
        </Paper>
      )}
    </React.Fragment>
  )
}
