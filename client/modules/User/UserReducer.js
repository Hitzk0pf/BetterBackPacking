import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTH_SUCCESS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED
} from './UserActions';

// Initial State
const initialState = {
    loginSuccess: false,
    authenticated: false,
    loggedIn: false,
    attemptedLogin: false,
    registerSuccess: false
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_USER_SUCCESS :
            return Object.assign({}, state, {
                registerSuccess: true
            });

        case REGISTER_USER_FAILED :
            return Object.assign({}, state, {
                registerSuccess: false
            });

        case AUTH_SUCCESS :

            return Object.assign({}, state, {
                loginSuccess: true,
                authenticated: true,
                loggedIn: true,
                attemptedLogin: true
            });

        case LOGIN_SUCCESS :

            return Object.assign({}, state, {
                loginSuccess: true,
                authenticated: true,
                loggedIn: true,
                attemptedLogin: true
            });

        case LOGIN_FAILED :

            return Object.assign({}, state, {
                loginSuccess: false,
                authenticated: false,
                attemptedLogin: true
            });

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
