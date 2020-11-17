import React from 'react'
import PostCard from './postCard'
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

export default function Main() {
    const classes = useStyles();
    return (
            <div className={classes.root}>
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        )
    }
