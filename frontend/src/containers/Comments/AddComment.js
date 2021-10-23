import React, {useState} from 'react';
import {Grid, makeStyles, Paper, Typography, TextField, Button} from "@material-ui/core";
import {useDispatch} from "react-redux";

import {addComment, getComments} from "../../store/actions/commentsActions";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
}));

const initialState = {
    author: '',
    content: '',
};
const AddComment = ({post_id}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [comment, setComment] = useState(initialState);

    const handleInputChange = e => {
        const {name, value} = e.target;

        setComment(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        try {
            await dispatch(addComment({
                ...comment,
                post_id,
            }));
            dispatch(getComments(post_id));
            setComment(initialState);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Typography variant="h6" className={classes.title}>Add new comment</Typography>
                <form onSubmit={handleFormSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                name="author"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={comment.author}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                name="content"
                                label="Comment"
                                variant="outlined"
                                multiline
                                rows={5}
                                fullWidth
                                value={comment.content}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
};

export default AddComment;