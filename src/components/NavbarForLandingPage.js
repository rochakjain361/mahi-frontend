import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Chip from '@material-ui/core/Chip'
import {
  ThemeProvider
} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { theme } from '../theme'
import { getAllTags, setTag, setOrdering } from '../actions/extraActions'
import NavbarContent from './Navbar'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)',
      width: '100%',
      position: 'fixed',
      zIndex: 1100,
    },
    motto: {
      padding: '0 1.25rem',
      fontSize: '1.5rem',
      fontWeight: 500,
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
    const changeTag = (id) => {
      window.scrollTo(0,0)
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
    return (
      <div>
        <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position='static' elevation={0}>
          <NavbarContent/>
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