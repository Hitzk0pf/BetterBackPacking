import callApi from '../../util/apiCaller';
import cookie from 'react-cookie';
import {Router, browserHistory} from 'react-router';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SAVE_FB_TOKEN = "SAVE_FB_TOKEN";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTH_FAILED = "AUTH_FAILED";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const ADD_USER_FINISHED = "ADD_USER_FINISHED";
export const ADD_USER_ERROR = "ADD_USER_ERROR";

export function checkAddUser(user) {
  return (dispatch) => {
    console.log(user);
    if(user) {
      if(user.cuid) {
        dispatch(addUserFinished());
      }
    } else {
      dispatch(addUserError());
    }
  }
}

export function addUserFinished() {
  return {
    type: ADD_USER_FINISHED,
  };
}

export function addUserError() {
  return {
    type: ADD_USER_ERROR,
  };
}

export function addUser(user) {
  return (dispatch) => {
    return callApi('users', 'post', '', { user }).then(res => dispatch(checkAddUser(res.user)));
  };
}

export function loginRequest(user) {
    return (dispatch) => {

        var loginUser = {
            email: user.username,
            password: user.password
        };

        return callApi('login', 'post', '', loginUser).then(res => {

            if(!res.loginSuccess) {
                dispatch(loginFailed());
            } else {
                dispatch(loginSuccess(res.token));
            }

        });
    };
}

export function loginSuccess(token) {
    // save cookie
    console.log('token', token)
    cookie.save('jwt', token);

    return {
        type: LOGIN_SUCCESS
    };
}

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    };
}

export function authUser() {
    return (dispatch) => {
      const token = cookie.load('jwt');
      console.log("now /api/auth is called with this token: ", token);
      return callApi('auth', 'post', token, {} // send JWT Token to authenticate (otherwise its '')
      ).then(res => {
        if(res.authenticationSuccess)
        {
          dispatch(authSuccess(res.authenticatedUser));
        }
        else
        {
          dispatch(authFailed());
        }
      });

    };
}

export function logoutUser() {
  //remove cookie with JWT token
  cookie.remove('token', { path: '/' });

  return {
    type: LOGOUT_USER,
  };
}

export function authSuccess(user) {
  return {
    type: AUTH_SUCCESS,
    user,
  };
}

export function authFailed() {
  //remove cookie with JWT token
  cookie.remove('token', { path: '/' });

  return {
    type: AUTH_FAILED,
  };
}


export function saveFBToken(token) {
    return (dispatch) => {
      cookie.save('token', decodeURIComponent(token), { path: '/' });
      dispatch(authUser());
      //browserHistory.push('/login');
    }
}
