import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '0.5rem',
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
    padding: '0 1.25rem',
    boxSizing: 'border-box'
  },
  header: {
    fontSize: '1.25em',
    marginTop: '0.75em',
    fontWeight: 500
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}))

export default function AdditionalDoc () {
  const classes = useStyles()
  const activeCause = useSelector(state => state.causes.activeCause)
  const additionalMedia =
    activeCause &&
    activeCause.media_files &&
    activeCause.media_files.map(file => {
      return (
        <GridListTile key={file.id}>
          <img src={'http://127.0.0.1:8000' + file.media} alt='Media' />
          <GridListTileBar
            title='additional doc'
            classes={{
              root: classes.titleBar,
              title: classes.title
            }}
            actionIcon={
              <IconButton aria-label={`star doc`}>
                <StarBorderIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>
      )
    })

  return (
    <div className={classes.root}>
      <div className={classes.gridroot}>
        <Typography className={classes.header}>Additional Documents</Typography>
        <GridList className={classes.gridList} cols={1}>
          {additionalMedia}
        </GridList>
      </div>
    </div>
  )
}
