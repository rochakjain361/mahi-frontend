import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Fab, ThemeProvider } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'

import PostCard from './postCard'
import { getAllCauses } from '../actions/CauseActions'
import { theme } from '../theme'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    alignItems: 'center',
    padding: '1.25rem'
  },
  extendedIcon: {
    marginRight: '0.5rem'
  },
  fab: {
    boxShadow: 'none',
    position: 'sticky',
    bottom: '1rem',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.875rem'
  }
}))

export default function Main () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const tag = useSelector(state => state.extras.tag)
  useEffect(() => {
    dispatch(getAllCauses(tag))
  }, [tag, dispatch])

  const addComplain = () => {
    history.push('/add')
  }

  const all_causes = useSelector(state => state.causes.Causes)
  const PostCards = all_causes.map(cause => {
    return <PostCard cause={cause} key={cause.id} />
  })

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root} onClick={() => dispatch(getAllCauses())}>
      {PostCards}
      <Fab variant="extended" color='secondary' className={classes.fab} onClick={addComplain}>
        <AddIcon className={classes.extendedIcon} />
        Add your complaint
      </Fab>
    </div>
    </ThemeProvider>
  )
}
