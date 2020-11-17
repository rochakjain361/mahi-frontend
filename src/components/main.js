import React from 'react'
import PostCard from './postCard'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
        flexFlow: 'column',
        alignItems: 'center',
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
