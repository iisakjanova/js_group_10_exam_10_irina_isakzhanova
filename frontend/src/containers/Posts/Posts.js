import React from 'react';
import {useSelector} from "react-redux";

import Post from "../../components/Post/Post";
import {useHistory} from "react-router-dom";

const Posts = () => {
    const posts = useSelector(state => state.posts.posts);
    const history = useHistory();

    const getFullPostHandler = (id) => {
        history.push(`/news/${id}`);
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
                    />
                ))
                :
                null
            }
        </>
    );
};

export default Posts;