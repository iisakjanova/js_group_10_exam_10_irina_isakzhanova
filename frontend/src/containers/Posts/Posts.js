import React from 'react';
import {useSelector} from "react-redux";

import Post from "../../components/Post/Post";

const Posts = () => {
    const posts = useSelector(state => state.posts.posts);

    return (
        <>
            {posts.length > 0
                ?
                posts.map(post => (
                    <Post
                        post={post}
                        key={post.id}
                    />
                ))
                :
                null
            }
        </>
    );
};

export default Posts;