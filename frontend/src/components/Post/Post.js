import React from 'react';
import {Button, Grid, Link, makeStyles, Paper, Typography} from "@material-ui/core";

import {apiURL} from "../../config";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    imageWrapper: {
        width: '30%',
        marginRight: theme.spacing(2),
    },
    image: {
        maxHeight: '130px',
        width: '150px',
    },
    bottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

const Post = (props) => {
    const post = props.post;
    const classes = useStyles();

    let image = null;

    if (post.image) {
        const imageUrl = apiURL + '/uploads/' + post.image;

        image = (
            <Grid item className={classes.imageWrapper}>
                <img src={imageUrl} className={classes.image} alt={post.title}/>
            </Grid>
        );
    }

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="subtitle2">{post.title}</Typography>
                    </Grid>
                    <Grid item container direction="row" className={classes.bottom}>
                        <Grid item>
                            <Typography variant="subtitle2">{post.datetime}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2">
                                <Link component="button" onClick={() => props.onGetFullPost(post.id)}>Read full post</Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="default"
                                onClick={() => props.onRemove(post.id)}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {image}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Post;