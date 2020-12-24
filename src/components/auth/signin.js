import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CloseIcon from '@material-ui/icons/Close'
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import { ToastContainer, toast } from 'material-react-toastify'

import { cleanOTP } from '../../actions/SignupActions'
import {
  sendOTP,
  VerifyOTP,
  googleLogin,
  facebookLogin
} from '../../actions/AuthActions'
import FacebookIcon from '../../icons/fb'
import GoogleIcon from '../../icons/google'
import { Redirect, useHistory } from 'react-router-dom'
import { validatePhoneNumber } from '../../utils/validations'
import { isMobile } from 'react-device-detect'
import MahiFormIcon from '../../icons/mahiFormIcon'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#fff',
    padding: '0.9375rem 1.25rem',
    boxSizing: 'border-box'
  },
  rootDesktop: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '0.9375rem 1.25rem',
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
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
  registerContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
    fontSize: '0.875rem'
  },
  registerLink: {
    color: '#0000EE ',
    cursor: 'pointer',
    marginLeft: '0.3rem'
  },
  recaptchaContainer: {
    marginTop: '2.25rem'
  },
  errorContainer: {
    color: '#ff0000',
    fontSize: '0.75rem',
    marginTop: '0.25rem'
  },
  hidden: {
    display: 'none'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  desktopContainer: {
    width: '100%',
    maxWidth: '55rem',
    backgroundColor: '#fff',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  },
  logoContainer: {
    background: '#6552FF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    padding: '1.5rem 1.5rem 2rem 1.5rem'
  }
}))

export default function SignIn () {
  const classes = useStyles()
  const [phone_number, setPhoneNumber] = useState(null)
  const [phone_error, setPhoneError] = useState(null)
  const [otp, setOTP] = useState(null)
  const [captcha_solved, setCaptchaSolved] = useState(false)
  const [captcha_error, setCaptchError] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()

  const confirmationResult = useSelector(state => state.OTP.confirmationResult)
  const otpSending = useSelector(state => state.OTP.otpSending)
  const otpPending = useSelector(state => state.OTP.otpPending)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const signingIn = useSelector(state => state.auth.signingIn)

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'reCaptcha',
      {
        callback: response => {
          setCaptchaSolved(true)
          setCaptchError(false)
        }
      }
    )
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId
    })
  }, [])

  useEffect(() => {
    return () => {
      dispatch(cleanOTP)
    }
  })

  const handlePhoneChange = event => {
    setPhoneNumber(event.target.value)
  }

  const handleOTPChange = event => {
    setOTP(event.target.value)
  }

  const success_callback = message => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  const failure_callback = message => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  const send_OTP = () => {
    var appVerifier = window.recaptchaVerifier
    let err = false
    let phone_validation = validatePhoneNumber(phone_number)
    if (phone_validation.status === false) {
      setPhoneError(phone_validation.error)
      err = true
    } else {
      setPhoneError(null)
    }
    if (!captcha_solved) {
      setCaptchError(true)
      err = true
    } else {
      setCaptchError(false)
    }
    if (!err) {
      dispatch(
        sendOTP(phone_number, appVerifier, success_callback, failure_callback)
      )
    }
  }

  const verify_OTP = () => {
    dispatch(
      VerifyOTP(confirmationResult, otp, success_callback, failure_callback)
    )
  }

  const google_login = () => {
    dispatch(googleLogin(success_callback, failure_callback))
  }

  const facebook_login = () => {
    dispatch(facebookLogin(success_callback, failure_callback))
  }

  const returnHome = () => {
    history.push('/')
  }

  const register = () => {
    history.push('/register')
  }

  return (
    <React.Fragment>
      {isMobile ? (
        <Paper className={classes.root} elevation={0}>
          <Backdrop open={signingIn} className={classes.backdrop}>
            <CircularProgress color='inherit' />
          </Backdrop>
          {isAuthenticated && <Redirect to='/' />}
          <div className={classes.closeButtonContainer}>
            <IconButton onClick={returnHome}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography className={classes.header}>Sign in</Typography>
          <form>
            <TextField
              onChange={handlePhoneChange}
              className={classes.wide_input}
              label='Phone Number'
              InputLabelProps={{ className: classes.custom_label }}
              disabled={otpSending || otpPending}
              error={phone_error ? true : false}
              helperText={phone_error ? phone_error : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>+91</InputAdornment>
                )
              }}
            />
            <div id='reCaptcha' className={classes.recaptchaContainer} />
            <div
              className={
                captcha_error ? classes.errorContainer : classes.hidden
              }
            >
              Please solve the captcha
            </div>
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
          <div className={classes.registerContainer}>
            Don't have an account?
            <span className={classes.registerLink} onClick={register}>
              Register here
            </span>
          </div>
          <ToastContainer />
        </Paper>
      ) : (
        <Paper className={classes.rootDesktop} elevation={0}>
          <div className={classes.desktopContainer}>
            <div className={classes.logoContainer}>
              <MahiFormIcon />
            </div>
            <div className={classes.formContainer}>
              <Backdrop open={signingIn} className={classes.backdrop}>
                <CircularProgress color='inherit' />
              </Backdrop>
              {isAuthenticated && <Redirect to='/' />}
              <div className={classes.closeButtonContainer}>
                <IconButton onClick={returnHome}>
                  <CloseIcon />
                </IconButton>
              </div>
              <Typography className={classes.header}>Sign in</Typography>
              <form>
                <TextField
                  onChange={handlePhoneChange}
                  className={classes.wide_input}
                  label='Phone Number'
                  InputLabelProps={{ className: classes.custom_label }}
                  disabled={otpSending || otpPending}
                  error={phone_error ? true : false}
                  helperText={phone_error ? phone_error : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>+91</InputAdornment>
                    )
                  }}
                />
                <div id='reCaptcha' className={classes.recaptchaContainer} />
                <div
                  className={
                    captcha_error ? classes.errorContainer : classes.hidden
                  }
                >
                  Please solve the captcha
                </div>
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
              <div className={classes.registerContainer}>
                Don't have an account?
                <span className={classes.registerLink} onClick={register}>
                  Register here
                </span>
              </div>
              <ToastContainer />
            </div>
          </div>
        </Paper>
      )}
    </React.Fragment>
  )
}
