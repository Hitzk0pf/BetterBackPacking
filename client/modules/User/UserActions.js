import callApi from '../../util/apiCaller';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

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