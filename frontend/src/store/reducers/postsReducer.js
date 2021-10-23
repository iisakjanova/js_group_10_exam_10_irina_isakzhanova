import {
    ADD_POST_FAILURE,
    ADD_POST_REQUEST, ADD_POST_SUCCESS,
    GET_POST_BY_ID_FAILURE,
    GET_POST_BY_ID_REQUEST, GET_POST_BY_ID_SUCCESS,
    GET_POSTS_FAILURE,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS
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
            let postFound = false
            const updatedPosts = state.posts.map(post => {
                if (post.id === Number(action.payload.post.id)) {
                    postFound = true
                    return action.payload.post
                }
                return post;
            });

            if (!postFound) {
                updatedPosts.push(action.payload.post)
            }

            return {
                ...state,
                loading: false,
                posts: updatedPosts,
            };
        case GET_POST_BY_ID_FAILURE:
            return {...state, loading: false, error: action.payload};
        case ADD_POST_REQUEST:
            return {...state, loading: true};
        case ADD_POST_SUCCESS:
            return {...state, loading: false, error: false};
        case ADD_POST_FAILURE:
            return {...state, loading: false, error: action.payload};
        case REMOVE_POST_REQUEST:
            return {...state, loading: true};
        case REMOVE_POST_SUCCESS:
            return {...state, loading: false};
        case REMOVE_POST_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default postsReducer;