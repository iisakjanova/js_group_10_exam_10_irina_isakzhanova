import React, {useEffect} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import {useRouteMatch} from "react-router-dom";
import {getPostById} from "../../store/actions/postsActions";

const FullPost = () => {
    const dispatch = useDispatch();
    const match = useRouteMatch("/news/:id");
    const id = match.params.id

    useEffect(() => {
        dispatch(getPostById(id));
    }, []);

    const posts = useSelector(state => state.posts.posts);

    const post = posts.find(p => p.id === Number(id));
    if (!post) {
        return null
    }
    console.log({ post })

    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h5">{post.title}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">{post.datetime}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">{post.content}</Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default FullPost;