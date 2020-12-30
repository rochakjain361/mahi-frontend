import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Chip from '@material-ui/core/Chip'
import { Grid, ThemeProvider } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { theme } from '../theme'
import {
  getAllTags,
  setTag,
  setOrdering,
  showPendingCause
} from '../actions/extraActions'
import NavbarContent, { NavbarContentDesktop, NavbarExtra } from './Navbar'
import { isMobile, isTablet } from 'react-device-detect'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    zIndex: 1100,
    border: 'none',
    boxShadow: 'none',
  },
  motto: {
    padding: '0 1.25rem',
    fontSize: '1.5rem',
    fontWeight: 500
  },
  appBarDesktop: {
    padding: '1% 10% 1% 10%'
  }
}))

const useSelectStyles = makeStyles(theme => ({
  root: {
    padding: '0 1.25rem 1.25rem 1.25rem',
    display: 'flex',
    alignItems: 'baseline',
    fontSize: '0.75rem',
  },
  selectContainer: {
    display: 'flex',
    alignItems: 'baseline'
  },
  formControl: {
    marginLeft: theme.spacing(1),
    fontSize: '0.75rem'
  },
  // formControl: {
  //   marginLeft: theme.spacing(1),
  //   minWidth: 120,
  //   flexDirection: 'row'
  // },
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
  '@global': {
    '*::-webkit-scrollbar': {
      height: '0rem',
    },
  },
  root: {
    display: 'flex',
    overflowX: 'auto',
    margin: '0 1rem',
    padding: '0 0 0 0.5rem',
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

export function SimpleSelect () {
  const classes = useSelectStyles()
  const dispatch = useDispatch()
  const ordering = useSelector(state => state.extras.ordering)
  const pending = useSelector(state => state.extras.show_pending_cause)
  const user = useSelector(
    state => state.auth.Loggedinuser
  )
  const [sort_by, changeSort] = React.useState(
    ordering ? ordering : '-created_on'
  )
  const [display_pending, changeDisplayPending] = React.useState(
    pending ? pending : false
  )

  const handleSortChange = event => {
    changeSort(event.target.value)
    dispatch(setOrdering(event.target.value))
  }

  const hadlePendingChange = event => {
    changeDisplayPending(event.target.value)
    dispatch(showPendingCause(event.target.value))
  }

  return (
    <Grid container lg={12} className={classes.root}>
      <Grid item lg={6} xs={5} className={classes.selectContainer}>
        <FormControl className={classes.labelControl}>
          <div>Sorted by</div>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select
            className={classes.optionControl}
            autoWidth
            value={sort_by}
            onChange={handleSortChange}
            disableUnderline
          >
            <MenuItem value={'-created_on'}>New</MenuItem>
            <MenuItem value={'-supporter_count'}>Supports</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {user && user.is_volunteer && (
        <Grid item lg={6} xs={7} className={classes.selectContainer}>
          <FormControl className={classes.labelControl}>
            <div>Show:</div>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              className={classes.optionControl}
              autoWidth
              value={display_pending}
              onChange={hadlePendingChange}
              disableUnderline
            >
              <MenuItem value={false}>Approved complains</MenuItem>
              <MenuItem value={true}>Pending complains</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  )
}

export function Chips () {
  const classes = useChipStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllTags())
  }, [dispatch])
  const selected_tag = useSelector(state => state.extras.tag)
  const all_tags = useSelector(state => state.extras.Tags)
  const changeTag = id => {
    window.scrollTo(0, 0)
    dispatch(setTag(id))
  }
  const chipList = all_tags.map(tag => {
    return (
      <Chip
        className={selected_tag == tag.id ? classes.selectedTag : ''}
        onClick={() => changeTag(tag.id)}
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
        onClick={() => changeTag(0)}
        label='all'
        key='0'
        clickable
      />
      {chipList}
    </div>
  )
}

export default function NavbarForLandingPage (props) {
  const classes = useStyles()

  const[state, setState] = useState({
    responseView: false,
  })

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1300
        ? setState((prevState) => ({ ...prevState, responseView: true }))
        : setState((prevState) => ({ ...prevState, responseView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <AppBar position='static' elevation={0}>
            {isMobile ? <NavbarContent/> : state.responseView ? <NavbarContent/> : <NavbarContentDesktop />}
            <div className={isMobile ? '' : classes.appBarDesktop}>
              {isMobile ? '' : <NavbarExtra />}
              {isMobile ? '' : <h3 className={classes.motto}>Be the Change</h3>}
            </div>
          </AppBar>
        </ThemeProvider>
      </div>
    </div>
  )
}
