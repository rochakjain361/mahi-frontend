import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { green, red } from '@material-ui/core/colors'
import { ThemeProvider } from '@material-ui/core'

import LocationOnIcon from '@material-ui/icons/LocationOn'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { Icon, SvgIcon } from '@material-ui/core'
import {
  PostCardFooterFavLeftIcon,
  PostCardFooterFavRightIcon,
  PostCardFooterShareIcon
} from '../icons/menu'
import { theme } from '../theme'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    borderRadius: '0.5rem'
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    background: 'top',
    height: '1.6rem',
    borderRadius:'0.3rem',
    fontSize: '0.8rem',
    padding: '0.2rem 0.4rem',
  },
  subheader: {
    display: 'flex',
    alignItems: 'center'
  },
  subheader_icon: {
    display: 'flex',
    fontSize: '1.0rem'
  },
  subheader_text: {
    display: 'flex',
    alignItems: 'start'
  },
  LikeIcon: {
    marginLeft: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    position: 'relative'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  timeIcon: {
    fontSize: '1rem'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

export default function PostCard () {
  const classes = useStyles()

  const subheader = <LocationOnIcon size='small' />

  return (
    <Card className={classes.root}>
      <ThemeProvider theme={theme}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              R
            </Avatar>
          }
          title='Shrimp and Chorizo Paella'
          subheader={
            <div className={classes.subheader}>
              <div>
                <LocationOnIcon className={classes.subheader_icon} />
              </div>
              <div className={classes.subheader_text}>Mumbai, Maharashtra</div>
            </div>
          }
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests.
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image='https://www.businessinsider.in/thumb/msid-77685011,width-600,resizemode-4,imgsize-191817/tech/how-to/how-to-turn-on-dark-mode-in-google-chrome-on-your-computer-or-mobile-device/img5f4024f189aff80028ab7494.jpg'
          title='Paella dish'
        >
          <div className={classes.overlay}>
            <AccessTimeIcon className={classes.timeIcon}/>
            <p>14 Days left</p>
          </div>
        </CardMedia>
        <CardActions disableSpacing>
          <IconButton>
            <SvgIcon>
              <PostCardFooterFavLeftIcon />
            </SvgIcon>
          </IconButton>
          <p>24 Supporters</p>
          <IconButton className={classes.LikeIcon}>
            <SvgIcon>
              <PostCardFooterFavRightIcon />
            </SvgIcon>
          </IconButton>
          <IconButton>
            <SvgIcon>
              <PostCardFooterShareIcon />
            </SvgIcon>
          </IconButton>
        </CardActions>
      </ThemeProvider>
    </Card>
  )
}