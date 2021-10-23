import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getPosts} from "../../store/actions/postsActions";

const News = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div>
           News
        </div>
    );
};

export default News;