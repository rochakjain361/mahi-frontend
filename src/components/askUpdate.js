import { Button, Card, TextField } from '@material-ui/core'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '1rem',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxSizing: 'border-box'
  },
  header: {
    fontSize: '1.25em',
    marginTop: '0.75em',
    fontWeight: 500
  },
  submitButton: {
    backgroundColor: '#6552FF',
    display: 'flex',
    width: '100%',
    borderRadius: '0.4rem',
    marginTop: '0.7rem',
    color: 'white'
  },
  textfield: {
    width: '100%'
  }
}))

export default function AskUpdate () {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Typography className={classes.header}>Ask for an update</Typography>
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
    </React.Fragment>
  )
}
