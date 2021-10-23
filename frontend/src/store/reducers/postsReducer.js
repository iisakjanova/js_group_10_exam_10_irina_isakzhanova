import {
    GET_POST_BY_ID_FAILURE,
    GET_POST_BY_ID_REQUEST, GET_POST_BY_ID_SUCCESS,
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
        case GET_POST_BY_ID_REQUEST:
            return {...state, loading: true};
        case GET_POST_BY_ID_SUCCESS:
            const updatedPosts = state.posts.map(post => {
                if (post.id === action.payload.post.id) {
                    return action.payload.post
                }

                return post;
            });

            return {
                ...state,
                loading: false,
                posts: updatedPosts,
            };
        case GET_POST_BY_ID_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default postsReducer;