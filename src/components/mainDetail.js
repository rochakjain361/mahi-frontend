import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import AskUpdate from './askUpdate'

import { theme } from '../theme'
import PostDetailCard from './postDetailCard'
import BankDetails from './bankDetails'
import Volunteer from './volunteer'
import Log from './log'
import Suggestions from './suggestion'
import { useParams } from 'react-router-dom'
import { getCause } from '../actions/CauseActions'
import AdditionalDoc from './additionalDoc'
import { NavbarForDetailsPage } from './NavbarForDetailsPage'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1.25rem',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

export default function MainDetail () {
  const classes = useStyles()
  const params = useParams()
  const dispatch = useDispatch()
  const id = params.id
  useEffect(() => {
    dispatch(getCause(id))
  }, [id, dispatch])
  const activeCause = useSelector(state => state.causes.activeCause)
  console.log(activeCause)
  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavbarForDetailsPage cause={activeCause} />
        <div className={classes.root}>
          <PostDetailCard />
          <BankDetails />
          <Volunteer />
          <Log />
          <Suggestions />
          <AdditionalDoc />
          <AskUpdate />
        </div>
      </div>
    </ThemeProvider>
  )
}
