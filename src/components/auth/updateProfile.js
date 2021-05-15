import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core'

import { apiAuthClient } from '../../helpers/apiClient'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmail, updateUser, logout } from '../../actions/AuthActions'
import { toast, ToastContainer } from 'material-react-toastify'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import EditIcon from '@material-ui/icons/Edit'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import { isMobile } from 'react-device-detect'
import Navbar from '../Navbar'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '95vh',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box'
  },
  rootDesktop: {
    marginTop: '1rem',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minHeight: '80vh',
  },
  avatar: {
    width: '10rem',
    height: '10rem',
    backgroundColor: 'red',
    fontSize: '2.5rem'
  },
  container: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    padding: '2rem'
  },
  containerDesktop: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    padding: '2rem 5rem',
    borderRadius: '1rem'
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  headerText: {
    fontSize: '1.5rem'
  },
  hiddenInput: {
    display: 'none'
  },
  mediaButton: {
    textTransform: 'none'
  },
  wide_input: {
    width: '100%',
    marginTop: '2.25rem'
  },
  submitButton: {
    marginTop: '2.35rem',
    background: '#262626',
    textTransform: 'none',
    color: '#fff',
    fontSize: '1rem',
    borderRadius: 0,
    fontWeight: 400,
    padding: '0.6rem 1.2rem'
  },
  submitButtonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  verifyButton: {
    textTransform: 'none',
    marginTop: '0.1rem',
    padding: 0,
    color: '#0000EE'
  }
}))

export default function UpdateUser () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [first_name, setFirstName] = useState(null)
  const [last_name, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone_number, setPhoneNumber] = useState(null)
  const [email_verified, setEmailVerified] = useState(true)
  const [display_pic, setDisplayPic] = useState([])
  const [open, setOpen] = useState(false)
  const user = useSelector(state => state.auth.Loggedinuser)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name)
      setLastName(user.last_name)
      setEmail(user.email)
      setPhoneNumber(user.phone_number.slice(3))
      setEmailVerified(user.email_verified)
    }
  }, [user])

  const verify_email = () => {
    dispatch(verifyEmail())
  }

  const handleUpdateSuccess = message => {
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER })
  }

  const handleEmailUpdateSuccess = message => {
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER })
    dispatch(logout())
  }

  const handleUpdateError = message => {
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER })
  }

  const update_profile = () => {
    setOpen(false)
    let formdata = new FormData()
    formdata.append('phone_number', `+91${phone_number}`)
    formdata.append('email', email)

    if (display_pic.length !== 0) {
      formdata.append('display_picture', display_pic[0])
    }
    if (user.email === email) {
      dispatch(updateUser(formdata, handleUpdateSuccess, handleUpdateError))
    } else
      dispatch(
        updateUser(formdata, handleEmailUpdateSuccess, handleUpdateError)
      )
  }

  const handleUpdate = () => {
    if (user.email !== email) {
      setOpen(true)
    } else {
      update_profile()
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Navbar />
      {isAuthenticated===false && history.push('/')}
      <div className={isMobile ? classes.root : classes.rootDesktop}>
        <div
          className={isMobile ? classes.container : classes.containerDesktop}
        >
          <div className={classes.header}>
            <Avatar
              src={
                user && user.display_picture ? `${user.display_picture}` : ''
              }
              className={classes.avatar}
            >
              {user && user.first_name ? user.first_name[0] : 'Mahi'}
            </Avatar>
            {display_pic[0] ? (
              <div>
                <List dense={false}>
                  <ListItem>
                    <ListItemAvatar>
                      <InsertDriveFileOutlinedIcon />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        isMobile
                          ? display_pic[0].name.length > 15
                            ? display_pic[0].name.slice(0, 15) + '...'
                            : display_pic[0].name
                          : display_pic[0].name.length > 100
                          ? display_pic[0].name.slice(0, 100) + '...'
                          : display_pic[0].name
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => setDisplayPic([])}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </div>
            ) : (
              ''
            )}
            <input
              accept='image/*'
              onChange={event => {
                console.log(event.target.files)
                setDisplayPic([...event.target.files])
              }}
              name='display_pic'
              className={classes.hiddenInput}
              type='file'
              id='mahi_update_dp'
            />
            <label htmlFor='mahi_update_dp'>
              <Button
                className={classes.mediaButton}
                component='span'
                startIcon={<EditIcon />}
              >
                {'Change display picture'}
              </Button>
            </label>
            <Typography className={classes.headerText}>
              {user ? `${user.first_name} ${user.last_name}` : ''}
            </Typography>
          </div>
          <form>
            <TextField
              className={classes.wide_input}
              id='mahi_email'
              label='Email'
              value={email ? email : ''}
              disabled={user ? user.sign_in_provider !== 'phone' : true}
              onChange={event => {
                setEmail(event.target.value)
              }}
            />
            {user
              ? !email_verified &&
                email && (
                  <Button
                    className={classes.verifyButton}
                    onClick={verify_email}
                  >{`verify email`}</Button>
                )
              : ''}
            <TextField
              className={classes.wide_input}
              id='mahi_phone'
              label='Phone'
              value={phone_number ? (phone_number ? phone_number : '') : ''}
              disabled={user ? user.sign_in_provider === 'phone' : true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>+91</InputAdornment>
                )
              }}
              onChange={event => {
                setPhoneNumber(event.target.value)
              }}
            />
            <div className={classes.submitButtonContainer}>
              <Button
                variant='contained'
                onClick={handleUpdate}
                className={classes.submitButton}
              >
                Update Profile
              </Button>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                {'Update profile information'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  You are about to change your e-mail id. After performing this
                  action you will be logged out of your account.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={update_profile}>OK</Button>
                <Button onClick={handleClose} autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </form>
          <ToastContainer />
        </div>
      </div>
    </React.Fragment>
  )
}
