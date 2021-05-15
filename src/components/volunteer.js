import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
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

  const activeCause = useSelector(state => state.causes.activeCause)

  const volunteers =
    activeCause &&
    activeCause.associated_volunteers &&
    activeCause.associated_volunteers.map(volunteer => {
      return (
        <CardHeader
          key = {volunteer.user.id}
          avatar={
            <Avatar
              src={
                volunteer.user.display_picture
                  ? volunteer.user.display_picture
                  : ''
              }
              className={classes.avatar}
            >
              {volunteer.user.display_name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <ChevronRightIcon />
            </IconButton>
          }
          title={
            <Typography className={classes.title}>
              {volunteer.user.display_name}
            </Typography>
          }
          subheader='Complaint volunteer'
        />
      )
    })

  return <Card className={classes.root}>{volunteers}</Card>
}
