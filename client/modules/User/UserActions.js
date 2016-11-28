import callApi from '../../util/apiCaller';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

import cookie from 'react-cookie';

export function loginRequest(user) {
    return (dispatch) => {

        var loginUser = {
            email: user.username,
            password: user.password
        };

        return callApi('login', 'post', loginUser).then(res => {

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
    cookie.save('token', token, { path: '/' });

    return {
        type: LOGIN_SUCCESS
    };
}

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    };
}