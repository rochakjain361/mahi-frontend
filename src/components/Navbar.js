import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import { ThemeProvider } from '@material-ui/core'
import { SvgIcon } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Avatar from '@material-ui/core/Avatar'

import MenuIcon from '../icons/menu'
import { theme } from '../theme'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxShadow: '0px 0px 7px rgba(0, 0, 0, 0.1)'
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
    fontWeight: 500
  }
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
      marginRight: theme.spacing(1),
    }
  },
}))

function SimpleSelect () {
  const classes = useSelectStyles()
  const [sort_by, changeSort] = React.useState('n')

  const handleChange = event => {
    changeSort(event.target.value)
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
          <MenuItem value={'n'}>New</MenuItem>
          <MenuItem value={'s'}>Supports</MenuItem>
          <MenuItem value={'r'}>Reach</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

function Chips () {
  const classes = useChipStyles()
  return (
    <div className={classes.root}>
      <Chip label='All' clickable />
      <Chip label='Exam Transit' clickable />
      <Chip label='Hunger' clickable />
      <Chip label='Homeless' clickable />
      <Chip label='Basic' clickable />
      <Chip label='Basic' clickable />
      <Chip label='Basic' clickable />
      <Chip label='Basic' clickable />
      <Chip label='Basic' clickable />
      <Chip label='Basic' clickable />
    </div>
  )
}

export default function Navbar (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position='static' elevation={0}>
          <Toolbar className={classes.toolBar}>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <SvgIcon>
                <MenuIcon />
              </SvgIcon>
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Mahi Care
            </Typography>
            <Avatar
              src='https://react.semantic-ui.com/images/avatar/small/christian.jpg'
              alt='Mahi'
            />
          </Toolbar>
          <h3 className={classes.motto}>Be the Change</h3>
          <Chips />
          <SimpleSelect />
        </AppBar>
      </ThemeProvider>
    </div>
  )
}
