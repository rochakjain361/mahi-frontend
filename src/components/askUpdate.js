import { Button, Card, Grid, TextField } from '@material-ui/core'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '1rem',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxSizing: 'border-box'
  },
  rootDesktop: {
    width: '100%',
    marginTop: '1rem',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxSizing: 'border-box'
  },
  header: {
    fontSize: '1.25em',
    marginTop: '0.75em',
    fontWeight: 500,
    textAlign: 'center'
  },
  headerDesktop: {
    fontSize: '1.5em',
    marginTop: '1.75em',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.25em'
  },
  submitButton: {
    backgroundColor: '#6552FF',
    display: 'flex',
    width: '100%',
    borderRadius: '0.4rem',
    marginTop: '0.7rem',
    color: 'white'
  },
  submitButtonDesktop: {
    backgroundColor: 'black',
    textTransform: 'none',
    display: 'flex',
    borderRadius: '0.4rem',
    color: 'white',
    position: 'absolute',
    right: '0',
    top: '3rem'
  },
  textfield: {
    width: '100%'
  }
}))

export default function AskUpdate () {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Typography className={isMobile ? classes.header : classes.headerDesktop}>
        Ask for an update
      </Typography>
      {isMobile ? (
        <Card className={classes.root}>
          Submit your email so that we can send you an update on the complaint
          <TextField
            className={classes.textfield}
            id='standard-basic'
            label='Your email address'
          />
          <Button variant='contained' className={classes.submitButton}>
            Submit
          </Button>
        </Card>
      ) : (
        <Card className={classes.rootDesktop}>
          <Grid container lg={12}>
            <Grid item xs={7}>
              Submit your email so that we can send you an update on the
              complaint
              <TextField
                className={classes.textfield}
                id='standard-basic'
                label='Your email address'
              />
            </Grid>
            <Grid item xs={5}>
              <div
                style={{
                  position: 'relative'
                }}
              >
                <Button
                  variant='contained'
                  className={classes.submitButtonDesktop}
                  style={{
                  }}
                >
                  Submit
                </Button>
              </div>
            </Grid>
          </Grid>
        </Card>
      )}
    </React.Fragment>
  )
}
