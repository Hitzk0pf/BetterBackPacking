import callApi from '../../util/apiCaller';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const ADD_GUIDE_INFO_FAILED = "ADD_GUIDE_INFO_FAILED";
export const ADD_GUIDE_INFO_SUCCESS = "ADD_GUIDE_INFO_SUCCESS";

export function loginRequest(user) {
    return (dispatch) => {
        return callApi('login', 'post', {
            emai: user.email,
            password: user.password
        }).then(res => dispatch(loginSuccess(res))).catch(res => dispatch(loginFailed()));
    };
}

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
  return {
    type: ADD_GUIDE_INFO_SUCCESS,
    guideInfo,
  };
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
