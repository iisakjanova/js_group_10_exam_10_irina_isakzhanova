import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";

import {getPosts} from "../../store/actions/postsActions";
import Posts from "../Posts/Posts";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        justifyContent: 'space-between',
    },
}));

const News = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div>
           <Grid container className={classes.root}>
               <Grid item>
                   <Typography variant="h4">Posts</Typography>
               </Grid>
               <Grid item>
                   <Button
                       variant="contained"
                       color="default"
                   >
                       Add new post
                   </Button>
               </Grid>
           </Grid>
            <Grid container direction="column" spacing={3}>
                <Posts />
            </Grid>
        </div>
    );
};

export default News;