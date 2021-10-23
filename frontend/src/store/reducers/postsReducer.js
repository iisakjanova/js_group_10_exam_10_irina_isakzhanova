import {
    GET_POSTS_FAILURE,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS
} from "../actions/postsActions";

const initialState = {
    posts: [],
    loading: false,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return {...state, loading: true};
        case GET_POSTS_SUCCESS: {
            return {...state, loading: false, posts: action.payload};
        }
        case GET_POSTS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default postsReducer;