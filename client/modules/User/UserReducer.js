import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTH_SUCCESS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    ADD_USER_ERROR,
    ADD_USER_FINISHED,
    FETCH_AVATAR_FAILED,
    FETCH_AVATAR_SUCCESS,
    EDIT_USER_FAILED,
    EDIT_USER_SUCCESS,
} from './UserActions';

// Initial State
const initialState = {
    loginSuccess: false,
    authenticated: false,
    loggedIn: false,
    attemptedLogin: false,
    addUserFinished: false,
    addUserError: false,
    token: null,
    user: null,
    avatar: null,
    editUserError: null,
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
                attemptedLogin: true,
                user: action.user,
                token: action.token
            });
        case FETCH_AVATAR_SUCCESS :
            return Object.assign({}, state, {
                avatar: action.avatar,
            });
        case FETCH_AVATAR_FAILED :
            return Object.assign({}, state, {
                avatar: null,
            });
        case LOGIN_SUCCESS :
            return Object.assign({}, state, {
                loginSuccess: true,
                authenticated: true,
                loggedIn: true,
                attemptedLogin: true,
                token: action.token,
            });
        case LOGIN_FAILED :
            return Object.assign({}, state, {
                loginSuccess: false,
                authenticated: false,
                attemptedLogin: true
            });
        case EDIT_USER_FAILED :
            return Object.assign({}, state, {
                editUserError: true,
            });
        case EDIT_USER_SUCCESS :
            return Object.assign({}, state, {
                editUserError: false,
                user: action.user,
                avatar: action.avatar
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
