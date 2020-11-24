import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Card from '@material-ui/core/Card'
import { Button, CardActions, Collapse, ThemeProvider } from '@material-ui/core'

import { theme } from '../theme'
import Comment from './comment'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  tabs: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
  },
  tab: {
    textTransform: 'none'
  },
  cards: {
    border: 'none',
    width: '100%',
    padding: '1rem 0'
  },
  expand: {
    textTransform: 'none',
    fontSize: '0.75rem'
  },
  justify_space: {
    justifyContent: 'space-around'
  }
}))

const useCardStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '0.5rem',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    padding: '0 1.25rem',
    boxSizing: 'border-box'
  }
}))

function LogTabs () {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [activity_expanded, setActivityExpanded] = React.useState(false)
  const [donation_expanded, setDonationExpanded] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }

  const handleActivityExpandClick = () => {
    setActivityExpanded(!activity_expanded)
  }
  
  const handleDonationExpandClick = () => {
    setDonationExpanded(!donation_expanded)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <div>
          <Tabs
            classes={
                {
                    root: classes.tabs,
                    centered: classes.justify_space
                }
            }
            value={value}
            onChange={handleChange}
            indicatorColor='secondary'
            textColor='secondary'
            centered
            aria-label='full width tabs example'
          >
            <Tab
              className={classes.tab}
              label='Donation Log'
              {...a11yProps(0)}
            />
            <Tab
              className={classes.tab}
              label='Activity Log'
              {...a11yProps(1)}
            />
          </Tabs>
        </div>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Comment
              avatar={{
                src:
                  'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
                alt: 'Mahi'
              }}
              title={'Aditya Kulkarni'}
              subtitle={'8 hours ago'}
              content={
                'I would suggest, definitely take a look at the recent JEE complaint govt. schemes.'
              }
            />
            <Comment
              avatar={{
                src:
                  'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
                alt: 'Mahi'
              }}
              title={'Aditya Kulkarni'}
              subtitle={'8 hours ago'}
              content={
                'I would suggest, definitely take a look at the recent JEE complaint govt. schemes.'
              }
            />
            <CardActions style={{ justifyContent: 'center' }}>
              <Button
                className={classes.expand}
                onClick={handleDonationExpandClick}
              >
                {`View ${donation_expanded ? 'less ' : 'all '}donations`}
              </Button>
            </CardActions>
            <Collapse in={donation_expanded} timeout='auto' unmountOnExit>
              <Comment
                avatar={{
                  src:
                    'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
                  alt: 'Mahi'
                }}
                title={'Aditya Kulkarni'}
                subtitle={'21 hours ago'}
                content={
                  'Due to public transit strike in your area, maybe try arriving at the destination a day before. '
                }
              />
            </Collapse>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <Comment
              avatar={{
                src:
                  'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
                alt: 'Mahi'
              }}
              title={'Aditya Kulkarni'}
              subtitle={'8 hours ago'}
              content={
                'I would suggest, definitely take a look at the recent JEE complaint govt. schemes.'
              }
            />
            <Comment
              avatar={{
                src:
                  'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
                alt: 'Mahi'
              }}
              title={'Aditya Kulkarni'}
              subtitle={'21 hours ago'}
              content={
                'Due to public transit strike in your area, maybe try arriving at the destination a day before. '
              }
            />
            <CardActions style={{ justifyContent: 'center' }}>
              <Button
                className={classes.expand}
                onClick={handleActivityExpandClick}
              >
                {`View ${activity_expanded ? 'less ' : 'all '}activity`}
              </Button>
            </CardActions>
            <Collapse in={activity_expanded} timeout='auto' unmountOnExit>
              <Comment
                avatar={{
                  src:
                    'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
                  alt: 'Mahi'
                }}
                title={'Aditya Kulkarni'}
                subtitle={'21 hours ago'}
                content={
                  'Due to public transit strike in your area, maybe try arriving at the destination a day before. '
                }
              />
            </Collapse>
          </TabPanel>
        </SwipeableViews>
      </div>
    </ThemeProvider>
  )
}

export default function Volunteer () {
  const classes = useCardStyles()

  return (
    <Card className={classes.root}>
      <LogTabs />
    </Card>
  )
}
