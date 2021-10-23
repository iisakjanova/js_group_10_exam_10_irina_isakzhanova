import React, {useEffect} from 'react';
import {getComments, removeComment} from "../../store/actions/commentsActions";
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

const Comments = ({post_id}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments.comments);
    const classes = useStyles();

    useEffect(() => {
        dispatch(getComments(post_id));
    }, [dispatch, post_id]);

    const handleRemove = async (id) => {
        await dispatch(removeComment(id));
        dispatch(getComments(post_id));
    };

    return (
        <div>
            <Grid container direction="column" spacing={3} className={classes.root}>
                {comments.map(comment => {
                    return (
                        <Grid item key={comment.id}>
                            <Paper className={classes.paper}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography variant="subtitle2">{comment.author}</Typography>
                                    </Grid>
                                    <Grid item container direction="row" className={classes.row}>
                                        <Grid item>
                                            <Typography variant="subtitle2">{comment.content}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="default"
                                                onClick={() => handleRemove(comment.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default Comments;