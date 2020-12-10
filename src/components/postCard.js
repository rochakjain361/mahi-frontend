import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { findDaysLeft } from '../helpers/helperfunctions'
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
import ShowMoreText from 'react-show-more-text'
import { updateLikedUser } from '../actions/CauseActions'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import LocationOnIcon from '@material-ui/icons/LocationOn'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { SvgIcon } from '@material-ui/core'
import {
  PostCardFooterFavLeftIcon,
  PostCardFooterFavRightIcon,
  PostCardFooterShareIcon
} from '../icons/menu'
import { theme } from '../theme'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
    fontSize: '0.8rem'
  },
  PostCardBottomDetailRight: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'flex-end'
  },
  PostCardBottomDetailLeft: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column'
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
  mediaDiv: {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    position: 'relative',
    backgroundSize: 'contain'
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

export default function PostCard ({ cause }) {
  const classes = useStyles()
  const percentage = (cause.raised / cause.goal) * 100
  const daysLeft = findDaysLeft(cause.deadline)
  const history = useHistory()
  const user = useSelector(state => state.auth.Loggedinuser)
  const [expand, setExpand] = useState(false)
  const setExpandDetail = () => {
    setExpand(!expand)
  }

  const dispatch = useDispatch()
  return (
    <Card className={classes.root}>
      <ThemeProvider theme={theme}>
        <CardHeader
          avatar={
            <Avatar
              src={cause.needy_photo ? cause.needy_photo : ''}
              className={classes.avatar}
            >
              {cause.needy_name[0]}
            </Avatar>
          }
          title={cause.needy_name}
          subheader={
            <div className={classes.subheader}>
              <div>
                <LocationOnIcon className={classes.subheader_icon} />
              </div>
              <div className={classes.subheader_text}>
                {cause.needy_address}
              </div>
            </div>
          }
        />
        <CardContent>
          <Typography variant='body2' color='textPrimary' component='div'>
            <ShowMoreText
              lines={1}
              more={'Show More'}
              less={'Show Less'}
              onClick={setExpandDetail}
              expanded={expand}
            >
              {cause.description}
            </ShowMoreText>
          </Typography>
        </CardContent>
        <div
          className={classes.mediaDiv}
          onClick={() => history.push(`/${cause.id}`)}
        >
          <CardMedia
            className={classes.media}
            image={cause.cover_photo}
            title='cover photo'
          >
            <div className={classes.daysLeft}>
              <AccessTimeIcon className={classes.timeIcon} />
              <p>{daysLeft} Days left</p>
            </div>
            <div className={classes.PostCardBottom}>
              <div className={classes.PostCardBottomDetailLeft}>
                <div>₹{cause && cause.raised}</div>
                <div>RAISED</div>
              </div>
              <BorderLinearProgress variant='determinate' value={percentage} />
              <div className={classes.PostCardBottomDetailRight}>
                <div>₹{cause && cause.goal}</div>
                <div>GOAL</div>
              </div>
            </div>
          </CardMedia>
        </div>
        <CardActions disableSpacing>
          <IconButton>
            <SvgIcon>
              <PostCardFooterFavLeftIcon />
            </SvgIcon>
          </IconButton>
          <p>{cause.supporter_count} Supporters</p>
          <IconButton
            className={classes.LikeIcon}
            onClick={() => {
              console.log(cause.liked_by)
              console.log(user.id)
              cause && dispatch(updateLikedUser(cause.id))
            }}
          >
            {cause && user && (cause.liked_by).includes(user.id) ? (
              <FavoriteIcon style={{ fill: '#FC747A' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
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
