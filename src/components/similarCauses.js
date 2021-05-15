import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CircularProgress,
  Grid,
  ThemeProvider,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isMobile } from 'react-device-detect'

import PostCard from './postCard'
import { getSimilarCauses, getMoreSimilarCauses } from '../actions/CauseActions'
import { theme } from '../theme'

const useStyles = makeStyles(theme => ({
  desktopRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0'
  },
  mobileRoot: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItemDesktop: {
    padding: '0.75rem'
  },
  gridItemMobile: {
    paddingBottom: '1rem'
  },
  loader: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerDesktop: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    fontWeight: 500,
    textAlign: 'center'
  },
  headerMobile: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    fontWeight: 500,
    textAlign: 'center'
  },
  separatorContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  separatorDesktop: {
    marginTop: '4rem',
    marginBottom: '4rem',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '1px',
    height: '2px',
    width: '20%'
  },
  separatorMobile: {
    marginTop: '3rem',
    marginBottom: '3rem',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '1px',
    height: '2px',
    width: '15%'
  }
}))

export default function SimilarCauses (props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [prev_more_similar_cause_url, setPrevMoreSimilarCauseUrl] = useState(
    null
  )
  const { cause_id } = props

  useEffect(() => {
    cause_id && dispatch(getSimilarCauses(cause_id))
  }, [cause_id, dispatch])

  const more_causes_url = useSelector(state => state.causes.similarCauses.next)
  const pending_causes = useSelector(
    state => state.causes.getSimilarCausesPending
  )
  const pending_more_causes = useSelector(
    state => state.causes.getMoreSimilarCausesPending
  )

  const load_more_causes = useCallback(() => {
    const list = document.getElementById('mahi_causes_container')
    if (
      list &&
      !pending_more_causes &&
      more_causes_url &&
      more_causes_url !== prev_more_similar_cause_url &&
      window.pageYOffset + window.innerHeight + 100 >=
        list.clientHeight + list.offsetTop
    ) {
      dispatch(getMoreSimilarCauses(more_causes_url))
      setPrevMoreSimilarCauseUrl(more_causes_url)
    }
  }, [
    more_causes_url,
    prev_more_similar_cause_url,
    pending_more_causes,
    dispatch
  ])

  useEffect(() => {
    window.addEventListener('scroll', load_more_causes)
    return () => {
      window.removeEventListener('scroll', load_more_causes)
    }
  }, [more_causes_url, dispatch, load_more_causes])

  const all_similar_causes = useSelector(state => state.causes.similarCauses)
  const PostCards = all_similar_causes.results.map(cause => {
    return (
      <Grid
        lg={4}
        sm={6}
        xs={12}
        item
        className={isMobile ? classes.gridItemMobile : classes.gridItemDesktop}
        key={cause.id}
      >
        <PostCard cause={cause} />
      </Grid>
    )
  })

  return (
    <React.Fragment>
      {PostCards.length ? (
        <ThemeProvider theme={theme}>
          <div className={classes.separatorContainer}>
            <div
              className={
                isMobile ? classes.separatorMobile : classes.separatorDesktop
              }
            />
          </div>
          <Typography
            className={isMobile ? classes.headerMobile : classes.headerDesktop}
          >
            Similar Complaints
          </Typography>
          {pending_causes ? (
            <div className={classes.loader}>
              <CircularProgress color='secondary' />
            </div>
          ) : (
            <React.Fragment>
              <Grid
                container
                lg={12}
                className={isMobile ? classes.mobileRoot : classes.desktopRoot}
                id='mahi_causes_container'
              >
                {PostCards}
                {pending_more_causes && (
                  <div>
                    <CircularProgress color='secondary' />
                  </div>
                )}
              </Grid>
            </React.Fragment>
          )}
        </ThemeProvider>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}
