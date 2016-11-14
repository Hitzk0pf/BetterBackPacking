import {LOGIN_SUCCESS, LOGIN_FAILED} from './UserActions';

// Initial State
const initialState = {data: []};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS :
            return {};

        case LOGIN_FAILED :
            return {};

        default:
            return state;
    }
};


/*
 // Get all posts
 export const getPosts = state => state.posts.data;

 // Get post by cuid
 export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];
 */

// Export Reducer
export default UserReducer;
