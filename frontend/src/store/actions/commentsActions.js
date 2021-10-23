import axiosApi from "../../axiosApi";

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const getCommentsRequest = () => ({type: GET_COMMENTS_REQUEST});
export const getCommentsSuccess = data => ({type: GET_COMMENTS_SUCCESS, payload: data});
export const getCommentsFailure = error => ({type: GET_COMMENTS_FAILURE, payload: error});

export const addCommentRequest = () => ({type: ADD_COMMENT_REQUEST});
export const addCommentSuccess = () => ({type: ADD_COMMENT_SUCCESS});
export const addCommentFailure = error => ({type: ADD_COMMENT_FAILURE, payload: error});

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const removeCommentRequest = () => ({type: REMOVE_COMMENT_REQUEST});
export const removeCommentSuccess = () => ({type: REMOVE_COMMENT_SUCCESS});
export const removeCommentFailure = error => ({type: REMOVE_COMMENT_FAILURE, payload: error});

export const getComments = (id) => {
    return async dispatch => {
        try {
            dispatch(getCommentsRequest());
            const response = await axiosApi.get(`/comments?news_id=${id}`);
            dispatch(getCommentsSuccess(response.data));
        } catch (error) {
            dispatch(getCommentsFailure(error));
        }
    };
};

export const addComment = (data) => {
    return async dispatch => {
        try {
            dispatch(addCommentRequest());
            await axiosApi.post('/comments', data);
            dispatch(addCommentSuccess());
        } catch (error) {
            dispatch(addCommentFailure(error.response.data.error));
            throw new Error(error.response.data.error);
        }
    };
};

export const removeComment = id => {
    return async dispatch => {
        try {
            dispatch(removeCommentRequest());
            await axiosApi.delete(`/comments/${id}`);
            dispatch(removeCommentSuccess());
        } catch (error) {
            dispatch(removeCommentFailure(error));
        }
    };
};
