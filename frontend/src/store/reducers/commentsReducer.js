import {
    GET_COMMENTS_FAILURE,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS
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
        default:
            return state;
    }
};

export default commentsReducer;