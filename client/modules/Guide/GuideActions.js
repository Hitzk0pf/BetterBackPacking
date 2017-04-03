import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router'

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const ADD_GUIDE_INFO_FAILED = "ADD_GUIDE_INFO_FAILED";
export const ADD_GUIDE_INFO_SUCCESS = "ADD_GUIDE_INFO_SUCCESS";
export const FETCH_GUIDE_PROFILE_SUCCESS = 'FETCH_GUIDE_PROFILE_SUCCESS';
export const FETCH_GUIDE_PROFILE_FAILED = 'FETCH_GUIDE_PROFILE_FAILED';
export const FETCH_GUIDE_PROFILE_STARTED = 'FETCH_GUIDE_PROFILE_STARTED';

export function loginRequest(user) {
  return (dispatch) => {
    return callApi('login', 'post', {
      email: user.email,
      password: user.password
    }).then(res => dispatch(loginSuccess(res))).catch(res => dispatch(loginFailed()));
  };
}

// FETCH GUIDE PROFILE

export function fetchGuideProfileSuccess(guideInfos) {
  return {
    type: FETCH_GUIDE_PROFILE_SUCCESS,
    guideInfos,
  };
}

export function fetchGuideProfileFailed() {
  return {
    type: FETCH_GUIDE_PROFILE_FAILED,
  };
}

export function fetchGuideProfileResult(guideInfos) {
  return (dispatch) => {
    if (guideInfos) {
      dispatch(fetchGuideProfileSuccess(guideInfos));
    } else {
      dispatch(fetchGuideProfileFailed());
    }
  };
}

export function fetchGuideProfileStarted() {
  return {
    type: FETCH_GUIDE_PROFILE_STARTED,
  };
}

export function fetchGuideProfile(cuid) {
  return (dispatch) => {
    dispatch(fetchGuideProfileStarted())
    return callApi(`guideInfos/${cuid}`, 'get').then(res => dispatch(fetchGuideProfileResult(res)));
  };
}

// FETCH GUIDE PROFILE END

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
}

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    };
}

export function addGuideInfoSuccess(guideInfo) {
  return (dispatch, getState) => {
    browserHistory.push('/guide' + getState.user.user.cuid)
    return {
      type: ADD_GUIDE_INFO_SUCCESS,
      guideInfo,
    };

  }
}

export function addGuideInfoFailed(error) {
  return {
    type: ADD_GUIDE_INFO_FAILED,
    error,
  };
}

export function addGuideInfo(guideInfo) {
    return (dispatch) => {
      //const token = cookie.load('token');
      const token = localStorage.getItem('token')
      console.log("log", token, { guideInfo })
      return callApi('guideInfos', 'post', token, { guideInfo } // send JWT Token to authenticate (otherwise its '')
      ).then(res => {
        if(res.guideInfo)
        {
            dispatch(addGuideInfoSuccess(res.guideInfo));
        }
        else
        {
          dispatch(addGuideInfoFailed('Something went wrong while updating your user'));
        }
      }).catch((err) => console.log("ERR", err));
    };
}
