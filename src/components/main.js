import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from './postCard'
import { makeStyles } from '@material-ui/core/styles'
import { getAllCauses } from '../actions/CauseActions'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
    alignItems: 'center',
    padding: '1.25rem'
  }
}))

export default function Main () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tag = useSelector(state => state.extras.tag)
  const user = useSelector(state => state.auth.Loggedinuser)
  useEffect(() => {
    dispatch(getAllCauses(tag))
  }, [tag])
  const all_causes = useSelector(state => state.causes.Causes)
  const PostCards = all_causes.map(cause => {
    return <PostCard cause={cause} key={cause.id} user={user}/>
  })

  return (
    <div className={classes.root} onClick={() => dispatch(getAllCauses())}>
      {PostCards}
    </div>
  )
}
