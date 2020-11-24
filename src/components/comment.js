import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import { CardContent, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: 'none',
    width: '100%',
    padding: '1rem 0',
    borderRadius: 0,
    '& > *': {
      padding: 0
    }
  },
  content: {
    fontSize: '0.875rem',
    fontWeight: 400,
    padding: '1rem 0 1.5rem 0',
  }
}))

export default function Comment (props) {
  const { avatar, title, subtitle, content } = props
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src={avatar.src} alt={avatar.alt} />}
        title={<Typography>{title}</Typography>}
        subheader={subtitle}
      />
      <CardContent style={{padding: 0}}>
        <Typography className={classes.content}>{content}</Typography>
      </CardContent>
    </Card>
  )
}
