import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  CircularProgress,
  Fab,
  Grid,
  GridList,
  GridListTile,
  ThemeProvider
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import ClearIcon from '@material-ui/icons/Clear'
import PostCard from './postCard'
import { getAllCauses, getMoreCauses } from '../actions/CauseActions'
import { theme } from '../theme'
import landingPageHeader from '../media/landingPageHeader.png'
import NavbarForLandingPage, {
  Chips,
  SimpleSelect
} from './NavbarForLandingPage'

const useStyles = makeStyles(theme => ({
  desktopRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 6rem'
  },
  mobileRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.25rem'
  },
  gridItemDesktop: {
    padding: '0.75rem'
  },
  gridItemMobile: {
    paddingBottom: '1rem'
  },
  extendedIcon: {
    marginRight: '0.5rem'
  },
  fab: {
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
    margin: '0 1rem'
  },
  fabMobile: {
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.75rem',
    margin: '0'
  },
  fabContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    bottom: '1rem',
    zIndex: '1200'
  },
  fabContainerDesktop: {
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    bottom: '5.5rem'
  },
  fabContainerMobile: {
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    bottom: '4rem',
    zIndex: '1200'
  },
  loader: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertBarDesktop: {
    width: '100%',
    background: 'black',
    color: 'white',
    height: '5rem',
    padding: '1rem',
    position: 'sticky',
    bottom: '0',
    justifyContent: 'center'
  },
  alertBarMobile: {
    width: '100%',
    background: 'white',
    height: '3.5rem',
    padding: '0.25rem 0',
    position: 'sticky',
    bottom: '0',
    justifyContent: 'center'
  },
  hiddenAlertBar: {
    display: 'none'
  },
  innerAlert: {
    maxWidth: '1720px'
  },
  alertDescription: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '1rem'
  },
  textAlignCentre: {
    textAlign: 'center'
  },
  closeAlertMobile: {
    paddingTop: '0.75rem'
  },
  closeAlertDesktop: {
    paddingTop: '0.75rem',
    marginLeft: '2rem'
  },
  motto: {
    padding: '0 1.25rem',
    fontSize: '1.5rem',
    fontWeight: 500
  },
  mottoMobile: {
    padding: '0 1.25rem',
    fontSize: '1.5rem',
    fontWeight: 500,
    textAlign: 'center'
  },
  landingPageHeader: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: '60% 15%',
    borderBottomRightRadius: '60% 15%',
    opacity: 0.6
  },
  navbarHeaderDesktop: {
    padding: '1% 10% 1% 10%',
    boxShadow: '0px 7px 7px -7px rgba(0, 0, 0, 0.1)',
    background: 'white',
    borderTop: '-1rem',
    position: 'sticky',
    top: '4rem',
    zIndex: '1100'
  },
  navbarHeaderMobile: {
    position: 'sticky',
    top: '3.5rem',
    paddingTop: '0.5rem',
    background: '#fff',
    zIndex: '1100',
    boxShadow: '0px 7px 7px -7px rgba(0, 0, 0, 0.1)'
  },
  HeaderContainer: {
    background: '#fff',
    paddingBottom: '1rem',
    overflowX: 'hidden'
  },
  ImageContainer: {
    backgroundColor: '#000',
    position: 'relative',
    color: 'white',
    textAlign: 'center',
    transform: 'scaleX(2.5)',
    borderRadius: '0 0 50% 50% / 0 0 100% 100%',
    '& *': {
      transform: 'scaleX(0.4)'
    }
  },
  textContainer: {
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '40%',
    maxWidth: '40rem',
    transform: 'scaleX(1)',
    position: 'absolute'
  },
  title1: {
    fontSize: '2.5rem',
    fontWeight: '500',
    opacity: 0.6
  },
  title2: {
    fontSize: '2.5rem',
    fontWeight: '500'
  },
  subTitle1: {
    marginTop: '2rem',
    padding: '0 2rem',
    fontSize: '1rem',
    fontWeight: '400'
  }
}))

export default function Main () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [prev_more_cause_url, setPrevMoreCauseUrl] = React.useState(null)
  const [alertBarVisible, setAlertBarVisible] = useState(true)
  const tag = useSelector(state => state.extras.tag)
  const ordering = useSelector(state => state.extras.ordering)
  const pending = useSelector(state => state.extras.show_pending_cause)
  useEffect(() => {
    dispatch(getAllCauses(tag, ordering, pending))
  }, [tag, ordering, pending, dispatch])

  const more_causes_url = useSelector(state => state.causes.Causes.next)
  const pending_causes = useSelector(state => state.causes.getCausesPending)
  const pending_more_causes = useSelector(
    state => state.causes.getMoreCausesPending
  )
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const load_more_causes = useCallback(() => {
    const list = document.getElementById('mahi_causes_container')
    if (
      list &&
      !pending_more_causes &&
      more_causes_url &&
      more_causes_url !== prev_more_cause_url &&
      window.pageYOffset + window.innerHeight + 100 >=
        list.clientHeight + list.offsetTop
    ) {
      dispatch(getMoreCauses(more_causes_url))
      setPrevMoreCauseUrl(more_causes_url)
    }
  }, [more_causes_url, prev_more_cause_url, pending_more_causes, dispatch])

  useEffect(() => {
    window.addEventListener('scroll', load_more_causes)
    return () => {
      window.removeEventListener('scroll', load_more_causes)
    }
  }, [more_causes_url, dispatch, load_more_causes])

  const addComplain = () => {
    history.push('/add')
  }

  const closeAlertBar = () => {
    setAlertBarVisible({ alertBarVisible: false })
  }

  const all_causes = useSelector(state => state.causes.Causes)
  const PostCards = all_causes.results.map(cause => {
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
      <NavbarForLandingPage />
      {isMobile ? (
        <div className={classes.HeaderContainer}>
          <div className={classes.ImageContainer}>
            <img
              src={landingPageHeader}
              className={classes.landingPageHeader}
            />
            <div className={classes.textContainer}>
              <div className={classes.title1}>Let's</div>
              <div className={classes.title2}>be Better.</div>
              <div className={classes.subTitle1}>
                Basic necessities are every individual’s birth right. We connect
                those deserving of aid and those providing it.
              </div>
            </div>
          </div>
          <h3 className={classes.mottoMobile}>Be the Change</h3>
        </div>
      ) : (
        <div className={classes.navbarHeaderDesktop}>
          <Grid container lg={12}>
            <Grid item xs={12} sm={12} lg={8}>
              <Chips />
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
              <SimpleSelect />
            </Grid>
          </Grid>
        </div>
      )}
      {isMobile ? (
        <div className={classes.navbarHeaderMobile}>
          <Chips />
          <SimpleSelect />
        </div>
      ) : (
        ''
      )}
      <ThemeProvider theme={theme}>
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
            {isAuthenticated ? (
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
            ) : (
              <div
                className={
                  alertBarVisible == true
                    ? isMobile
                      ? classes.fabContainerMobile
                      : classes.fabContainerDesktop
                    : classes.fabContainer
                }
              >
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
            )}
            {isAuthenticated ? (
              ''
            ) : (
              <Grid
                container
                lg={12}
                className={
                  alertBarVisible == true
                    ? isMobile
                      ? classes.alertBarMobile
                      : classes.alertBarDesktop
                    : classes.hiddenAlertBar
                }
              >
                {isMobile ? (
                  <Grid item xs={6} className={classes.alertDescription}>
                    Our platform isn’t an NGO, and takes NO commission
                  </Grid>
                ) : (
                  <Grid item lg={3} xs={4} className={classes.alertDescription}>
                    Our platform isn’t an NGO, and takes NO commission
                  </Grid>
                )}
                {isMobile ? (
                  <Grid item xs={4} className={classes.textAlignCentre}>
                    <Fab
                      variant='extended'
                      color='secondary'
                      className={classes.fabMobile}
                      onClick={closeAlertBar}
                    >
                      Okay got it!
                    </Fab>
                  </Grid>
                ) : (
                  <Grid item lg={1} xs={3} className={classes.textAlignCentre}>
                    <Fab
                      variant='extended'
                      color='primary'
                      className={classes.fab}
                      onClick={closeAlertBar}
                    >
                      Okay got it!
                    </Fab>
                  </Grid>
                )}
                {isMobile ? (
                  <Grid item xs={1} className={classes.closeAlertMobile}>
                    <ClearIcon onClick={closeAlertBar} />
                  </Grid>
                ) : (
                  <Grid
                    item
                    lg={1}
                    xs={1}
                    className={classes.closeAlertDesktop}
                  >
                    <ClearIcon onClick={closeAlertBar} />
                  </Grid>
                )}
              </Grid>
            )}
          </React.Fragment>
        )}
      </ThemeProvider>
    </React.Fragment>
  )
}
