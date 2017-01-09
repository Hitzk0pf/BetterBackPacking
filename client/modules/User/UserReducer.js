import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTH_SUCCESS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    ADD_USER_ERROR,
    ADD_USER_FINISHED,
} from './UserActions';

// Initial State
const initialState = {
    loginSuccess: false,
    authenticated: false,
    loggedIn: false,
    attemptedLogin: false,
    addUserFinished: false,
    addUserError: false,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
         case ADD_USER_FINISHED :
           return Object.assign({}, state, {
           addUserFinished: true,
           addUserError: false,
           });
         case ADD_USER_ERROR :
           return Object.assign({}, state, {
           addUserError: true,
           addUserFinished: false
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
