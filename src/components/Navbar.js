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
import Avatar from '@material-ui/core/Avatar';

import MenuIcon from '../icons/menu'
import { theme } from '../theme'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  motto: {
    marginLeft: theme.spacing(2)
  }
}))

const useSelectStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    fontSize: '12px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    flexDirection: 'row'
  },
  labelControl: {
    margin: theme.spacing(1),
    marginRight: 0,
    minWidth: 0,
    color: '#000',
    opacity: 0.5
  },
  optionControl: {
    color: '#000',
    fontSize: '12px',
    fontWeight: 500,
  },
}))

const useChipStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
    '& > *': {
      margin: theme.spacing(0.5),
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(2)
    }
  }
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
        <div id='demo-simple-select-label'>Sorted by</div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Select
          className={classes.optionControl}
          autoWidth
          labelId='demo-simple-select-label'
          id='demo-simple-select'
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
      <Chip label='Basic' clickable />
      <Chip label='Basic' clickable />
      <Chip label='Basic' clickable />
      <Chip label='Basic' clickable />
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
        <AppBar position='static' elevation={2}>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <SvgIcon>
                <MenuIcon />
              </SvgIcon>
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Mahi Care
            </Typography>
            <Avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' alt='Mahi'/>
          </Toolbar>
          <h3 className={classes.motto}>Be the Change</h3>
          <Chips />
          <SimpleSelect />
        </AppBar> 
      </ThemeProvider>
    </div>
  )
}
