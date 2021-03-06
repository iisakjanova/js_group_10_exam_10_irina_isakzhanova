import React, {useState} from 'react';
import {Grid, makeStyles, Paper, Typography, TextField, Button} from "@material-ui/core";
import {useDispatch} from "react-redux";

import FileInput from "../../components/UI/FileInput/FileInput";
import {addPost} from "../../store/actions/postsActions";

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
    title: '',
    content: '',
    image: null,
};
const AddPost = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [post, setPost] = useState(initialState);
    const [fileInputKey, setFileInputKey] = useState(null);

    const handleInputChange = e => {
        const {name, value} = e.target;

        setPost(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setPost(prev => ({
            ...prev,
            [name]: file,
        }));
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(post).forEach(key => {
            formData.append(key, post[key]);
        });

        try {
            await dispatch(addPost(formData));
            setPost(initialState);
            setFileInputKey(Math.random());
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Typography variant="h6" className={classes.title}>Add new post</Typography>
                <form onSubmit={handleFormSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                required
                                name="title"
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={post.title}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                name="content"
                                label="Content"
                                variant="outlined"
                                multiline
                                rows={5}
                                fullWidth
                                value={post.content}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs>
                            <FileInput
                                key={fileInputKey}
                                label="Image"
                                name="image"
                                onChange={handleFileChange}
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

export default AddPost;