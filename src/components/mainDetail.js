import React from 'react'
import PostDetailCard from './postDetailCard'
import { makeStyles } from '@material-ui/core/styles';

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
            </div>
        )
    }
