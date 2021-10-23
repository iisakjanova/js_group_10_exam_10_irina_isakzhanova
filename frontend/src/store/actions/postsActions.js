import axiosApi from "../../axiosApi";

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const GET_POST_BY_ID_REQUEST = 'GET_POST_BY_ID_REQUEST';
export const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
export const GET_POST_BY_ID_FAILURE = 'GET_POST_BY_ID_FAILURE';

export const getPostsRequest = () => ({type: GET_POSTS_REQUEST});
export const getPostsSuccess = data => ({type: GET_POSTS_SUCCESS, payload: data});
export const getPostsFailure = error => ({type: GET_POSTS_FAILURE, payload: error});

export const getPostByIdRequest = () => ({type: GET_POST_BY_ID_REQUEST});
export const getPostByIdSuccess = (id, post) => ({type: GET_POST_BY_ID_SUCCESS, payload: {id, post}});
export const getPostByIdFailure = error => ({type: GET_POST_BY_ID_FAILURE, payload: error});

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

export const getPostById = (id) => {
    return async dispatch => {
        try {
            dispatch(getPostByIdRequest());
            const response = await axiosApi.get(`/news/${id}`);
            dispatch(getPostByIdSuccess(id, response.data));
        } catch (error) {
            dispatch(getPostByIdFailure(error));
        }
    };
};