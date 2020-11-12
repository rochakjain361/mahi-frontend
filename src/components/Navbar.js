import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import { ThemeProvider } from '@material-ui/core'
import { SvgIcon } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
  }
}))

const useSelectStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
}))

const useChipStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
    '& > *': {
      margin: theme.spacing(0.5),
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
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-label'>Sort by</InputLabel>
        <Select
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
            <Button color='inherit'>Login</Button>
          </Toolbar>
          <Chips />
          <SimpleSelect />
        </AppBar>
      </ThemeProvider>
    </div>
  )
}
