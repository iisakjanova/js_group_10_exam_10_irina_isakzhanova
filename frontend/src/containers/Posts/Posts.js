import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import Post from "../../components/Post/Post";
import {useHistory} from "react-router-dom";
import {getPosts, removePost} from "../../store/actions/postsActions";

const Posts = () => {
    const posts = useSelector(state => state.posts.posts);
    const history = useHistory();
    const dispatch = useDispatch();

    const getFullPostHandler = (id) => {
        history.push(`/news/${id}`);
    };

    const removePostHandler = async (id) => {
        await dispatch(removePost(id));
        dispatch(getPosts());
    };

    return (
        <>
            {posts.length > 0
                ?
                posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        onGetFullPost={getFullPostHandler}
                        onRemove={removePostHandler}
                    />
                ))
                :
                null
            }
        </>
    );
};

export default Posts;