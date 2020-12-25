import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { red } from '@material-ui/core/colors'
import extraNavbarMedia from '../media/extraNavbarMedia.png'
import {
  Button,
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
import { isMobile, isTablet } from 'react-device-detect'
import MahiIcon from '../icons/mahi'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'fixed',
    zIndex: 1100
  },
  mainDivDesktop: {
    position: 'fixed',
    // width: 'inherit'
    width: '100%',
    zIndex: '4',
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    paddingLeft: '9%',
    paddingRight: '9%'
    // color: theme.palette.primary.main
  },
  toolBar: {
    // padding: '0% !important',
    // position: 'fixed'
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 500
  },
  motto: {
    padding: '0 1.25rem',
    fontSize: '1.5rem',
    fontWeight: 500
  },
  extraNavbar: {
    display: 'flex',
    marginTop: '8%',
    justifyContent: 'space-between'
  },
  extraNavbarDescription: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    width: '42%'
  },
  extraNavbarMedia: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  topExtraNavbar: {
    fontSize: '5rem',
    marginBottom: '2rem'
  },
  bottomExtraNavbar: {
    display: 'flex',
    alignItems: 'center'
  },
  midExtraNavbar: {
    marginBottom: '2rem'
  },
  lets: {},
  createUtopia: {},
  addComplainButton: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    padding: '1rem',
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    marginRight: '2rem'
  },
  learnMore: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  sideBarHeading: {
    padding: '0 1.25rem',
    fontSize: '1.5rem',
    fontWeight: 500
  },
  listDesktop: {
    display: 'flex'
  },
  navbarListDesktop: {
    width: '45%'
  },
  navbarDesktopDiv: {
    display: 'flex',
    alignItems: 'center',
    width: '-webkit-fill-available',
    justifyContent: 'space-between'
  },
  listItemDesktop: {
    minWidth: 'max-content'
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
  }
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
        <MahiIcon/>
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

export function NavbarExtra (props) {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <div className={classes.extraNavbar}>
      <div className={classes.extraNavbarDescription}>
        <div className={classes.topExtraNavbar}>
          <div className={classes.lets}>Let's</div>
          <div className={classes.createUtopia}>Create a Utopia</div>
        </div>
        <div className={classes.midExtraNavbar}>
          Basic necessities are every individual’s birth right. We connect those
          deserving of aid and those providing it.
        </div>
        <div className={classes.bottomExtraNavbar}>
          <Button
            variant='contained'
            onClick={() => history.push('/add')}
            className={classes.addComplainButton}
          >
            Add a Complaint
          </Button>
          <Button
            button
            onClick={() => history.push('/about_us')}
            className={classes.learnMore}
          >
            Learn More <ArrowForwardIcon />{' '}
          </Button>
        </div>
      </div>
      <div className={classes.extraNavbarMedia}>
        <img src={extraNavbarMedia}></img>
      </div>
    </div>
  )
}

export function NavbarContentDesktop (props) {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

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
    <div className={classes.navbarListDesktop} role='presentation'>
      {/* <h3 className={classes.sideBarHeading}>Mahi Care</h3> */}
      {/* <Divider /> */}
      <List className={classes.listDesktop}>
        {[
          { text: 'Pulse Feed', handleClick: returnHome },
          { text: 'Add complaint', handleClick: addComplain },
          { text: 'About us', handleClick: showAboutUs },
          {
            text: isAuthenticated ? 'Log out' : 'Sign in',
            handleClick: isAuthenticated ? logOut : signIn
          }
        ].map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={item.handleClick}
            className={classes.listItemDesktop}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  const LoggedInUser = useSelector(state => state.auth.Loggedinuser)

  return (
    <div className={classes.mainDivDesktop}>
      <Toolbar className={classes.toolBar}>
        <div
          edge='start'
          color='inherit'
          aria-label='navbar'
          className={classes.navbarDesktopDiv}
        >
          <div onClick={returnHome}>
            <MahiIcon />
          </div>
          {list()}
        </div>
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
    </div>
  )
}

export default function Navbar (props) {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <AppBar position='static' elevation={0}>
            {isMobile ? <NavbarContent/> : <NavbarContentDesktop />}
          </AppBar>
        </ThemeProvider>
      </div>
      <div style={{ paddingBottom: '3.75rem' }} />
    </div>
  )
}
