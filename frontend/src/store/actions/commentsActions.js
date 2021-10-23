import axiosApi from "../../axiosApi";

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const getCommentsRequest = () => ({type: GET_COMMENTS_REQUEST});
export const getCommentsSuccess = data => ({type: GET_COMMENTS_SUCCESS, payload: data});
export const getCommentsFailure = error => ({type: GET_COMMENTS_FAILURE, payload: error});

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
