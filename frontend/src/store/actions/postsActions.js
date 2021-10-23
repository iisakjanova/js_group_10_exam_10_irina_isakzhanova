import axiosApi from "../../axiosApi";

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const getPostsRequest = () => ({type: GET_POSTS_REQUEST});
export const getPostsSuccess = data => ({type: GET_POSTS_SUCCESS, payload: data});
export const getPostsFailure = error => ({type: GET_POSTS_FAILURE, payload: error});

export const getPosts = () => {
    return async dispatch => {
        try {
            dispatch(getPostsRequest());
            const response = await axiosApi.get('/news');

            dispatch(getPostsSuccess(response.data));
        } catch (error) {
            dispatch(getPostsFailure(error));
        }
    };
};