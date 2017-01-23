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
export const FETCH_AVATAR_FAILED = "FETCH_AVATAR_FAILED";
export const FETCH_AVATAR_SUCCESS = "FETCH_AVATAR_SUCCESS";
export const EDIT_USER_FAILED = "EDIT_USER_FAILED";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";

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
  return (dispatch) => {
    // save cookie
    //cookie.save('token', token, { path: '/' });
    localStorage.setItem('token', token)
    console.log('token', token);

    dispatch(loginSuccessToken(token))
    dispatch(authUser())

  }
}

export function loginSuccessToken(token) {
    return {
        type: LOGIN_SUCCESS,
        token
    };
}

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    };
}

export function authUser() {
    return (dispatch) => {
      //const token = cookie.load('token');
      const token = localStorage.getItem('token')
      console.log("now /api/auth is called with this token: ", token);
      return callApi('auth', 'post', token, {} // send JWT Token to authenticate (otherwise its '')
      ).then(res => {
        if(res.authenticationSuccess)
        {
          dispatch(authSuccess(res.authenticatedUser, token));
          dispatch(fetchAvatar(res.authenticatedUser));
        }
        else
        {
          dispatch(authFailed());
        }
      });

    };
}

export function logoutUser() {
  //remove localStorage entry with JWT token
  //cookie.remove('token', { path: '/' });
  localStorage.removeItem('token')

  return {
    type: LOGOUT_USER,
  };
}



export function editUserSuccess(user) {
  const avatar = user['avatar']
  user['avatar'] = null

  return {
    type: EDIT_USER_SUCCESS,
    user,
    avatar
  };
}

export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

export function editUser(user) {
    return (dispatch) => {
      //const token = cookie.load('token');
      const token = localStorage.getItem('token')
      console.log("log", user.cuid, token, user)
      return callApi('users/' + user.cuid, 'put', token, { user } // send JWT Token to authenticate (otherwise its '')
      ).then(res => {
        if(res.user)
        {
            dispatch(editUserSuccess(res.user));
        }
        else
        {
          dispatch(editUserFailed('Something went wrong while updating your user'));
        }
      }).catch((err) => console.log("ERR", err));
    };
}

export function fetchAvatar(user) {
    return (dispatch) => {
      //const token = cookie.load('token');
      const token = localStorage.getItem('token')
      console.log('users/' + user.cuid)
      return callApi('users/' + user.cuid, 'get', token, // send JWT Token to authenticate (otherwise its '')
      ).then(res => {
        if(res.user)
        {
          if(res.user.avatar) {
            dispatch(fetchAvatarSuccess(res.user.avatar));
          } else {
            dispatch(fetchAvatarSuccess(null));
          }
        }
        else
        {
          dispatch(fetchAvatarFailed('Something went wrong when fetching your avatar'));
        }
      });

    };
}

export function fetchAvatarSuccess(avatar) {
  return {
    type: FETCH_AVATAR_SUCCESS,
    avatar,
  };
}

export function fetchAvatarFailed(error) {
  return {
    type: FETCH_AVATAR_FAILED,
    error,
  };
}

export function authSuccess(user, token) {
  return {
    type: AUTH_SUCCESS,
    user,
    token
  };
}

export function authFailed() {
  //remove cookie with JWT token
  localStorage.removeItem('token');

  return {
    type: AUTH_FAILED,
  };
}


export function saveFBToken(token) {
    return (dispatch) => {
      localStorage.setItem('token', decodeURIComponent(token));
      dispatch(authUser());
      //browserHistory.push('/login');
    }
}
