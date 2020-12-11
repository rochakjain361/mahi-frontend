import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress, Fab, ThemeProvider } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import PostCard from './postCard'
import { getAllCauses, getMoreCauses } from '../actions/CauseActions'
import { theme } from '../theme'

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

  const more_causes_url = useSelector(state => state.causes.Causes.next)
  const pending_causes = useSelector(
    state => state.causes.getCausesPending
  )

  const load_more_causes = useCallback(() => {
    const list = document.getElementById('mahi_causes_container')
    if (
      !pending_causes &&
      more_causes_url &&
      window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop
    ) {
      dispatch(getMoreCauses(more_causes_url))
    }
  }, [more_causes_url, pending_causes, dispatch])

  useEffect(() => {
    window.addEventListener('scroll', load_more_causes)
    return () => {
      window.removeEventListener('scroll', load_more_causes)
    }
  }, [more_causes_url, dispatch, load_more_causes])

  const addComplain = () => {
    history.push('/add')
  }

  const all_causes = useSelector(state => state.causes.Causes)
  const PostCards = all_causes.results.map(cause => {
    return <PostCard cause={cause} key={cause.id} />
  })

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} id='mahi_causes_container'>
        {PostCards}
        {pending_causes && <div><CircularProgress color='secondary'/></div>}
        <Fab
          variant='extended'
          color='secondary'
          className={classes.fab}
          onClick={addComplain}
        >
          <AddIcon className={classes.extendedIcon} />
          Add your complaint
        </Fab>
      </div>
    </ThemeProvider>
  )
}
