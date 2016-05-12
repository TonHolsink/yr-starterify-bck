import fetch from 'isomorphic-fetch';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const LOGIN_AUTHENTICATING = 'LOGIN_AUTHENTICATING';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export function loginUserSuccess(data) {

    if (!data.succesful)
    {
        throw data.errors;
    }

    //localStorage.setItem('token', token);
    return {
        type: USER_LOGGED_IN,
        payload: {
            token: 'asdsd',
            user: data.user
        }
    }
}

export function logout() {
    return {
        type: USER_LOGGED_OUT
    }
}

export function loginUserRequest() {
    return {
        type: LOGIN_AUTHENTICATING
    }
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function validateLogin(username, password) {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch('http://demo.q-more.nl/services/users.usersJSON.checkLogin', {
            method: 'post',
            body: JSON.stringify({username: username, password: password, subscriber: 'bouw'})
        })
            .then(response => response.json())
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response));
                } catch (e) {
                    console.log('validateLogin', e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Ongeldig inlognaam of wachtwoord'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}
