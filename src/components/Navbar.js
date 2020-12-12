import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  ThemeProvider
} from '@material-ui/core'
import { SvgIcon } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import MenuIcon from '../icons/menu'
import { theme } from '../theme'
import { useHistory } from 'react-router-dom'
import { logout } from '../actions/AuthActions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
    width: '100%',
    position: 'fixed',
    zIndex: 1100,
  },
  toolBar: {
    padding: '1.25rem 1.25rem 0 1.25rem'
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 500
  },
  motto: {
    padding: '0 1.25rem',
    fontSize: '1.5rem',
    fontWeight: 500,
    textAlign: 'center'
  },
  sideBarHeading: {
    padding: '0 1.25rem',
    fontSize: '1.5rem',
    fontWeight: 500
  },
  sideBar: {
    width: 250
  },
  list: {
    padding: '1.75rem 0.25rem'
  },
  sideBarFooter: {
    position: 'fixed',
    bottom: 0,
    padding: '1rem 1.25rem',
    lineHeight: '2.25rem'
  },
  avatar: {
    backgroundColor: red[500]
  },
  subheader: {
    display: 'flex',
    alignItems: 'center'
  },
  subheader_text: {
    display: 'flex',
    alignItems: 'start'
  },
}))

export function NavbarContent (props) {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [state, setState] = React.useState({
    left: false
  })

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, left: open })
  }

  const returnHome = () => {
    history.push('/')
  }

  const addComplain = () => {
    history.push('/add')
  }

  const showAboutUs = () => {
    history.push('/about_us')
  }

  const signIn = () => {
    history.push('/sign_in')
  }

  const logOut = () => {
    dispatch(logout())
  }

  const list = () => (
    <div
      className={classes.sideBar}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <h3 className={classes.sideBarHeading}>Mahi Care</h3>
      <Divider />
      <List className={classes.list}>
        {[
          { text: 'Pulse Feed', handleClick: returnHome },
          { text: 'Add complaint', handleClick: addComplain },
          { text: 'About us', handleClick: showAboutUs },
          {
            text: isAuthenticated ? 'Log out' : 'Sign in',
            handleClick: isAuthenticated ? logOut : signIn
          }
        ].map((item, index) => (
          <ListItem button key={item.text} onClick={item.handleClick}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <div className={classes.sideBarFooter}>
        Reach us @ +91 9077339077 <br />
        © Copy right 2020 <br />
      </div>
    </div>
  )

  const LoggedInUser = useSelector(state => state.auth.Loggedinuser)
  console.log(LoggedInUser)

  return (
    <Toolbar className={classes.toolBar}>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='menu'
        onClick={toggleDrawer(true)}
      >
        <SvgIcon>
          <MenuIcon />
        </SvgIcon>
        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          onBackdropClick={toggleDrawer(false)}
          onEscapeKeyDown={toggleDrawer(false)}
        >
          {list()}
        </SwipeableDrawer>
      </IconButton>
      <Typography variant='h6' className={classes.title} onClick={returnHome}>
        Mahi
      </Typography>
      <Avatar
        src={
          LoggedInUser && LoggedInUser.display_picture
            ? `${LoggedInUser.display_picture}`
            : ''
        }
        className={classes.avatar}
      >
        {LoggedInUser && LoggedInUser.first_name
          ? LoggedInUser.first_name[0]
          : 'Mahi'}
      </Avatar>
    </Toolbar>
  )
}

export default function Navbar (props) {
  const classes = useStyles()
  return (
    <div>
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position='static' elevation={0}>
          <NavbarContent />
        </AppBar>
      </ThemeProvider>
    </div>
    <div style={{paddingBottom: "4.75rem"}}/>
    </div>
  )
}