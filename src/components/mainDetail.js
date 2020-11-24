import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import PostDetailCard from './postDetailCard'
import BankDetails from './bankDetails'
import Volunteer from './volunteer'
import Log from './log'
import Suggestions from './suggestion'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'column',
        alignItems: 'center',
        padding: '1.25rem'
    },
  }));

export default function MainDetail() {
    const classes = useStyles();
    return (
            <div className={classes.root}>
                <PostDetailCard />
                <BankDetails/>
                <Volunteer/>
                <Log/>
                <Suggestions/>
            </div>
        )
    }
