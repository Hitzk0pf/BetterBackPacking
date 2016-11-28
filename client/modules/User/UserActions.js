import callApi from '../../util/apiCaller';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

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
                dispatch(loginSuccess());
            }

        });
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