import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress, Fab, Grid, GridList, GridListTile, ThemeProvider } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import {isMobile} from 'react-device-detect'

import PostCard from './postCard'
import { getAllCauses, getMoreCauses } from '../actions/CauseActions'
import { theme } from '../theme'
import NavbarForLandingPage from './NavbarForLandingPage'

const useStyles = makeStyles(theme => ({
  desktopRoot: {
    // display: 'flex',
    justifyContent: 'center',
    // flexFlow: 'column',
    alignItems: 'center',
    padding: '3rem 6rem'
  },
  mobileRoot: {
    // display: 'flex',
    justifyContent: 'center',
    // flexFlow: 'column',
    alignItems: 'center',
    padding: '1.25rem'
  },
  gridItemDesktop: {
    padding: '0.75rem',
  },
  gridItemMobile: {
    paddingBottom: '1rem',
  },
  extendedIcon: {
    marginRight: '0.5rem'
  },
  fab: {
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.875rem'
  },
  fabContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    bottom: '1rem'
  },
  loader: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default function Main () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const tag = useSelector(state => state.extras.tag)
  const ordering = useSelector(state => state.extras.ordering)
  useEffect(() => {
    dispatch(getAllCauses(tag, ordering))
  }, [tag, ordering, dispatch])

  const more_causes_url = useSelector(state => state.causes.Causes.next)
  const pending_causes = useSelector(state => state.causes.getCausesPending)
  const pending_more_causes = useSelector(
    state => state.causes.getMoreCausesPending
  )

  const load_more_causes = useCallback(() => {
    const list = document.getElementById('mahi_causes_container')
    if (
      !pending_more_causes &&
      more_causes_url &&
      window.pageYOffset + window.innerHeight + 100 >=
        list.clientHeight + list.offsetTop
    ) {
      dispatch(getMoreCauses(more_causes_url))
    }
  }, [more_causes_url, pending_more_causes, dispatch])

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
    return <Grid lg={4} sm={6} xs={12} item className={isMobile ? classes.gridItemMobile : classes.gridItemDesktop} ><PostCard cause={cause} key={cause.id}/></Grid>
  })

  return (
    <React.Fragment>
      <NavbarForLandingPage />
      <ThemeProvider theme={theme}>
        {pending_causes ? (
          <div className={classes.loader}>
            <CircularProgress color='secondary' />
          </div>
        ) : (
          <React.Fragment>
            <Grid container lg={12} className={isMobile ? classes.mobileRoot : classes.desktopRoot} id='mahi_causes_container'>
              {PostCards}
              {pending_more_causes && (
                <div>
                  <CircularProgress color='secondary' />
                </div>
              )}
            </Grid>
            <div className={classes.fabContainer}>
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
          </React.Fragment>
        )}
      </ThemeProvider>
    </React.Fragment>
  )
}
