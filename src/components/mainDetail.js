import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AskUpdate from './askUpdate';

import PostDetailCard from './postDetailCard'
import BankDetails from './bankDetails'
import Volunteer from './volunteer'
import Log from './log'
import Suggestions from './suggestion'
import { useParams } from 'react-router-dom';
import { getCause } from '../actions/CauseActions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1.25rem',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
  }));

export default function MainDetail() {
    const classes = useStyles();
    const params = useParams()
    const dispatch = useDispatch()
    const id = params.id
    useEffect(() => {
      dispatch(getCause(id))
    }, [id])
    const activeCause = useSelector(state => state.causes.activeCause)
    console.log(activeCause)
    const user = useSelector(state => state.auth.Loggedinuser)
    console.log(user)
    return (
            <div className={classes.root}>
                <PostDetailCard cause={activeCause} user={user}/>
                <BankDetails bankDetails={activeCause.bankDetail}/>
                <Volunteer/>
                <Log/>
                <Suggestions/>
                <AskUpdate />
            </div>
        )
    }
