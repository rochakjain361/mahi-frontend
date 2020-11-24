import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import Comment from './comment'
import { Button, CardActions, Collapse } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    padding: '1rem 1.25rem 0 1.25rem',
    boxSizing: 'border-box'
  },
  header: {
    fontSize: '1.25em',
    marginTop: '0.75em',
    fontWeight: 500
  },
  expand: {
    textTransform: 'none',
    fontSize: '0.75rem'
  },
})

export default function Suggestions () {
  const classes = useStyles()
  const [suggestions_expanded, setSuggestionsExpanded] = React.useState(false)

  const handleSuggestionExpandClick = () => {
    setSuggestionsExpanded(!suggestions_expanded)
  }

  return (
    <React.Fragment>
      <Typography className={classes.header}>Suggestions</Typography>
      <Card className={classes.root}>
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
            onClick={handleSuggestionExpandClick}
          >
            {`View ${suggestions_expanded ? 'less ' : 'all '}suggestions`}
          </Button>
        </CardActions>
        <Collapse in={suggestions_expanded} timeout='auto' unmountOnExit>
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
      </Card>
    </React.Fragment>
  )
}
