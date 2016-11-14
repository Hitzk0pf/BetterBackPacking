import callApi from '../../util/apiCaller';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export function loginRequest(user) {
    return (dispatch) => {
        return callApi('login', 'post', {
            emai: user.email,
            password: user.password
        }).then(res => loginSuccess()).catch(res => loginFailed());
    };
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginFailed() {
    return {
        type: LOGIN_FAILED
    };
}