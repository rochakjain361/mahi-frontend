import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import { ThemeProvider } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'

import LocationOnIcon from '@material-ui/icons/LocationOn'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { SvgIcon } from '@material-ui/core'
import {
  PostCardFooterFavLeftIcon,
  PostCardFooterFavRightIcon,
  PostCardFooterShareIcon
} from '../icons/menu'
import { theme } from '../theme'

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    borderRadius: '0.5rem',
    marginBottom: '0.8rem'
  },
  daysLeft: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    background: 'top',
    height: '1.6rem',
    borderRadius: '0.3rem',
    fontSize: '0.8rem',
    padding: '0.2rem 0.4rem'
  },
  PostCardBottom: {
    display: 'flex',
    position: 'absolute',
    bottom: '20%',
    left: '10%',
    width: '80%',
    alignItems: 'center',
    color: 'white',
    fontSize: '0.8rem',
  },
  PostCardBottomDetailRight: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'flex-end',
  },
  PostCardBottomDetailLeft: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
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

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 8,
    borderRadius: 5,
    width: '70%'
  },
  colorPrimary: {
    backgroundColor: 'rgba(242, 240, 255, 0.25)'
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'white'
  }
}))(LinearProgress)

export default function PostCard () {
  const classes = useStyles()

  // const subheader = <LocationOnIcon size='small' />

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
          <Typography variant='body2' color='textPrimary' component='p'>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests.
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image='https://www.businessinsider.in/thumb/msid-77685011,width-600,resizemode-4,imgsize-191817/tech/how-to/how-to-turn-on-dark-mode-in-google-chrome-on-your-computer-or-mobile-device/img5f4024f189aff80028ab7494.jpg'
          title='Paella dish'
        >
          <div className={classes.daysLeft}>
            <AccessTimeIcon className={classes.timeIcon} />
            <p>14 Days left</p>
          </div>
          <div className={classes.PostCardBottom}>
            <div className={classes.PostCardBottomDetailLeft}>
              <div>₹4000</div>
              <div>RAISED</div>
            </div>
            <BorderLinearProgress variant='determinate' value={50} />
            <div className={classes.PostCardBottomDetailRight}>
            <div>₹8000</div>
            <div>GOAL</div>
            </div>
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
