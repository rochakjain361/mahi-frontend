import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ShowMoreText from 'react-show-more-text'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import {
  Card,
  CardActions,
  CardMedia,
  IconButton,
  LinearProgress,
  SvgIcon,
  ThemeProvider,
  withStyles
} from '@material-ui/core'
import {
  PostCardFooterFavLeftIconDetail,
  PostCardFooterFavRightIcon,
  PostCardFooterShareIcon
} from '../icons/menu'
import { useParams } from 'react-router-dom'
import { getCause } from '../actions/CauseActions'

const tutorialSteps = [
  {
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80'
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
  }
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderRadius: '0.5rem',
    paddingBottom: '0.8rem',
    marginBottom: '0.5rem'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  arrowIcon: {
    fontSize: '2.5rem',
    color: 'white'
  },
  stepper: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '40%',
    width: '100%'
  },
  LikeIcon: {
    marginLeft: 'auto'
  },
  PostCardDescription: {
    display: 'flex',
    width: 'auto',
    padding: '0.5rem 1.25rem',
    alignItems: 'center'
  },
  PostCardBottom: {
    display: 'flex',
    width: 'auto',
    padding: '0.5rem 1.25rem',
    fontSize: '0.8rem',
    alignItems: 'center'
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
  steps: {
    position: 'absolute',
    top: '10%',
    left: '80%',
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
  img: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    position: 'relative'
  }
}))

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 8,
    borderRadius: 5,
    width: '70%'
  },
  colorPrimary: {
    backgroundColor: '#F2F0FF'
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#6552FF'
  }
}))(LinearProgress)

export default function PostDetailCard (cause) {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = tutorialSteps.length
  const [expand, setExpand] = useState(false)
  const onClick = () => {
    setExpand(!expand)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const activeCause = cause.cause
  const percentage = (activeCause.raised / activeCause.goal) * 100
  console.log(cause)

  return (
    <Card className={classes.root}>
      <ThemeProvider theme={theme}>
        <CardMedia
          className={classes.img}
          image={tutorialSteps[activeStep].imgPath}
          alt={tutorialSteps[activeStep].label}
        >
          <div className={classes.steps}>
            {activeStep + 1}/{maxSteps}
          </div>
          <div className={classes.stepper}>
            <Button
              size='small'
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight className={classes.arrowIcon} />
              ) : (
                <KeyboardArrowLeft className={classes.arrowIcon} />
              )}
            </Button>
            <Button
              size='small'
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft className={classes.arrowIcon} />
              ) : (
                <KeyboardArrowRight className={classes.arrowIcon} />
              )}
            </Button>
          </div>
        </CardMedia>
        <CardActions disableSpacing>
          <IconButton>
            <SvgIcon>
              <PostCardFooterFavLeftIconDetail />
            </SvgIcon>
          </IconButton>
          <p>{activeCause.supporter_count} Supporters</p>
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
        <div className={classes.PostCardDescription}>
          <Typography variant='body2' color='textPrimary' component='div'>
            <ShowMoreText
              lines={2}
              more={'Show More'}
              less={'Show Less'}
              onClick={onClick}
              expanded={expand}
            >
              {activeCause.description}
            </ShowMoreText>
          </Typography>
        </div>
        <div className={classes.PostCardBottom}>
          <div className={classes.PostCardBottomDetailLeft}>
            <div>₹{activeCause.raised}</div>
            <div>RAISED</div>
          </div>
          <BorderLinearProgress variant='determinate' value={percentage} />
          <div className={classes.PostCardBottomDetailRight}>
            <div>₹{activeCause.goal}</div>
            <div>GOAL</div>
          </div>
        </div>
      </ThemeProvider>
    </Card>
  )
}
