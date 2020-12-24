import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import AskUpdate from './askUpdate'

import { theme } from '../theme'
import PostDetailCard from './postDetailCard'
import BankDetails from './bankDetails'
import Volunteer from './volunteer'
import Log from './log'
import Suggestions from './suggestion'
import { useHistory, useParams } from 'react-router-dom'
import { getCause, whitelistCause } from '../actions/CauseActions'
import AdditionalDoc from './additionalDoc'
import { NavbarForDetailsPage } from './NavbarForDetailsPage'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@material-ui/core'
import NotFound from './notFound'
import { isMobile } from 'react-device-detect'
import Navbar from './Navbar'
import SimilarCauses from './similarCauses'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1.25rem',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  approveButton: {
    display: 'flex',
    width: '100%',
    borderRadius: '0.4rem',
    marginBottom: '1.25rem',
    color: 'white'
  },
  textfield: {
    width: '100%'
  },
  tempDiv: {
    margin: '25%'
  },
  gridItemDesktop: {
    padding: '1rem'
  }
}))

export default function MainDetail () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const params = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const id = params.id

  useEffect(() => {
    dispatch(getCause(id))
  }, [id, dispatch])

  const handleClose = () => {
    setOpen(false)
  }

  const handleWhitelist = () => {
    dispatch(
      whitelistCause(id, () => {
        history.push('/')
      })
    )
  }

  const activeCause = useSelector(state => state.causes.activeCause)
  console.log(activeCause)
  const getCausePending = useSelector(state => state.causes.getCausePending)
  return (
    <ThemeProvider theme={theme}>
      {getCausePending ? (
        <div className={classes.tempDiv}>
          <CircularProgress color='secondary' />
        </div>
      ) : activeCause && activeCause.id ? (
        isMobile ? (
          <div>
            <NavbarForDetailsPage cause={activeCause} />
            <div className={classes.root}>
              {activeCause && activeCause.is_whitelisted === false && (
                <React.Fragment>
                  <Button
                    className={classes.approveButton}
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                      setOpen(true)
                    }}
                  >
                    Approve Complaint
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>
                      {'Approve this cause/complaint?'}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id='alert-dialog-description'>
                        By approving this cause/complaint you agree to volunteer
                        this cause/complaint.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleWhitelist}>OK</Button>
                      <Button onClick={handleClose} autoFocus>
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              )}
              <PostDetailCard />
              <BankDetails />
              <Volunteer />
              <Log />
              <Suggestions />
              {activeCause.media_files.length!==0 ? <AdditionalDoc /> : '' }
              <AskUpdate />
              <SimilarCauses cause_id={id} />
            </div>
          </div>
        ) : (
          <div>
            <Navbar />
            <div className={classes.root}>
              {activeCause && activeCause.is_whitelisted === false && (
                <React.Fragment>
                  <Button
                    className={classes.approveButton}
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                      setOpen(true)
                    }}
                  >
                    Approve Complaint
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogTitle id='alert-dialog-title'>
                      {'Approve this cause/complaint?'}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id='alert-dialog-description'>
                        By approving this cause/complaint you agree to volunteer
                        this cause/complaint.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleWhitelist}>OK</Button>
                      <Button onClick={handleClose} autoFocus>
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              )}
              <Grid container xs={12} style={{ maxWidth: '1440px' }}>
                <Grid item xs={7} className={classes.gridItemDesktop}>
                  <PostDetailCard />
                  <Log />
                  <Suggestions />
                  {activeCause.media_files.length!==0 ? <AdditionalDoc /> : '' }
                  <AskUpdate />
                </Grid>
                <Grid item xs={5} className={classes.gridItemDesktop}>
                  <BankDetails />
                  <Volunteer />
                </Grid>
                <Grid item xs={12} className={classes.gridItemDesktop}>
                  <SimilarCauses cause_id={id} />
                </Grid>
              </Grid>
            </div>
          </div>
        )
      ) : (
        <NotFound />
      )}
    </ThemeProvider>
  )
}
