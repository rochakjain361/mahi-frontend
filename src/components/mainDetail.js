import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AskUpdate from './askUpdate';

import PostDetailCard from './postDetailCard'
import BankDetails from './bankDetails'
import Volunteer from './volunteer'
import Log from './log'
import Suggestions from './suggestion'

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
    return (
            <div className={classes.root}>
                <PostDetailCard />
                <BankDetails/>
                <Volunteer/>
                <Log/>
                <Suggestions/>
                <AskUpdate />
            </div>
        )
    }
