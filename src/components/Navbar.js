import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, useActions } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import { red } from '@material-ui/core/colors'
import {
  CardHeader,
  ClickAwayListener,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  ThemeProvider
} from '@material-ui/core'
import { SvgIcon } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Avatar from '@material-ui/core/Avatar'
import CallIcon from '@material-ui/icons/Call'
import MenuIcon from '../icons/menu'
import { theme } from '../theme'
import { getAllTags, setTag, setOrdering } from '../actions/extraActions'
import { useHistory } from 'react-router-dom'
import { logout } from '../actions/AuthActions'
import MahiIcon from '../icons/mahi'

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

const useSelectStyles = makeStyles(theme => ({
  root: {
    padding: '0 1.25rem 1.25rem 1.25rem',
    display: 'flex',
    alignItems: 'baseline',
    fontSize: '0.75rem'
  },
  formControl: {
    marginLeft: theme.spacing(1),
    minWidth: 120,
    flexDirection: 'row'
  },
  labelControl: {
    marginRight: 0,
    minWidth: 0,
    color: '#000',
    opacity: 0.5
  },
  optionControl: {
    color: '#000',
    fontSize: '12px',
    fontWeight: 500
  }
}))

const useChipStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
    padding: '0 0 0 1.25rem',
    marginBottom: theme.spacing(2),
    '& > *': {
      backgroundColor: '#F5F5F5',
      padding: '0.875rem 1rem',
      fontWeight: 500,
      marginRight: theme.spacing(1)
    }
  },
  selectedTag: {
    background: 'black !important',
    color: 'white'
  }
}))

function SimpleSelect () {
  const classes = useSelectStyles()
  const dispatch = useDispatch()
  const [sort_by, changeSort] = React.useState('-created_on')

  const handleChange = event => {
    changeSort(event.target.value)
    dispatch(setOrdering(event.target.value))
  }
  return (
    <div className={classes.root}>
      <FormControl className={classes.labelControl}>
        <div>Sorted by</div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.optionControl}
          autoWidth
          labelId='demo-simple-select-label'
          value={sort_by}
          onChange={handleChange}
          disableUnderline
        >
          <MenuItem value={'-created_on'}>New</MenuItem>
          <MenuItem value={'-supporter_count'}>Supports</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

function Chips () {
  const classes = useChipStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllTags())
  }, [dispatch])
  const selected_tag = useSelector(state => state.extras.tag)
  console.log(selected_tag)
  const all_tags = useSelector(state => state.extras.Tags)
  const chipList = all_tags.map(tag => {
    return (
      <Chip
        className={selected_tag == tag.id ? classes.selectedTag : ''}
        onClick={() => dispatch(setTag(tag.id))}
        label={tag.tag_name}
        key={tag.id}
        clickable
      />
    )
  })
  return (
    <div className={classes.root}>
      <Chip
        className={selected_tag == '0' ? classes.selectedTag : ''}
        onClick={() => dispatch(setTag(0))}
        label='all'
        key='0'
        clickable
      />
      {chipList}
    </div>
  )
}

function NavbarContent (props) {
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
        <MahiIcon />
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

export function NavbarForLandingPage (props) {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.root}>
    <ThemeProvider theme={theme}>
      <AppBar position='static' elevation={0}>
        <NavbarContent />
        <h3 className={classes.motto}>Be the Change</h3>
        <Chips />
        <SimpleSelect />
      </AppBar>
    </ThemeProvider>
  </div>
  <div style={{paddingBottom: "15.47rem"}}/>
  </div>
  )
}

export function NavbarForDetailsPage ({ cause }) {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position='static' elevation={0}>
          <NavbarContent />
          {console.log(cause.needy_name)}
          <CardHeader
            avatar={
              <Avatar
                src={cause && cause.needy_photo ? cause.needy_photo : ''}
                className={classes.avatar}
              >
              </Avatar>
            }
            title={cause.needy_name}
            subheader={
              <div className={classes.subheader}>
                <div className={classes.subheader_text}>
                  {cause.needy_address}
                </div>
              </div>
            }
          />
        </AppBar>
      </ThemeProvider>
    </div>
    <div style={{paddingBottom: '10.5rem'}}></div>
    </div>
  )
}
