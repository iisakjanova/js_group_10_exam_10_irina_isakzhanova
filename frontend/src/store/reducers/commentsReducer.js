import {
    GET_COMMENTS_FAILURE,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    REMOVE_COMMENT_FAILURE,
    REMOVE_COMMENT_REQUEST,
    REMOVE_COMMENT_SUCCESS
} from "../actions/commentsActions";

const initialState = {
    comments: [],
    loading: false,
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS_REQUEST:
            return {...state, loading: true};
        case GET_COMMENTS_SUCCESS: {
            return {...state, loading: false, comments: action.payload};
        }
        case GET_COMMENTS_FAILURE:
            return {...state, loading: false, error: action.payload};
        case REMOVE_COMMENT_REQUEST:
            return {...state, loading: true};
        case REMOVE_COMMENT_SUCCESS:
            return {...state, loading: false};
        case REMOVE_COMMENT_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default commentsReducer;