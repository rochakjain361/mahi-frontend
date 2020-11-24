import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '0.5rem',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem'
  },
  title: {
      fontSize: '1rem',
      fontWeight: 500
  }
}))

export default function Volunteer () {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src='https://react.semantic-ui.com/images/avatar/small/christian.jpg'
            alt='Mahi'
          />
        }
        action={
          <IconButton aria-label='settings'>
            <ChevronRightIcon />
          </IconButton>
        }
        title={
            <Typography className={classes.title}>
                Aditya Kulkarni
            </Typography>
        }
        subheader='Complaint volunteer'
      />
    </Card>
  )
}
