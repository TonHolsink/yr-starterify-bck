import {jsonFetch} from '../utils';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const LOGIN_AUTHENTICATING = 'LOGIN_AUTHENTICATING';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const SUBSCRIBER_SET = 'SUBSCRIBER_SET';

export function loginUserSuccess(data) {

    if (!data.succesful)
    {
        throw data.errors;
    }

    //localStorage.setItem('token', token);
    return {
        type: USER_LOGGED_IN,
        payload: {
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
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function logoutSession() {
    return function(dispatch) {
        dispatch(logout());
        return jsonFetch('users.usersJSON.logOut')
        .then(response => {
            try {
                dispatch(logout());
            } catch (e) {
                console.log('logoutSession', e);
                dispatch(loginUserFailure({
                    response: {
                        status: 403
                    }
                }));
            }
        })
        .catch(error => {
            dispatch(loginUserFailure(error));
        });
    }
}

export function setSubscriber(subscriber) {

    let url = false;
    const parts = location.hostname.split('.');

    if (!subscriber)
    {
        const defaultSubscriber = 'easydemo';
        if (parts.indexOf('localhost') > -1)
        {
            url = defaultSubscriber + '.localhost';
        } else if (parts.indexOf('demo') > -1 && parts.indexOf('yourrequest') > -1) {
            url = defaultSubscriber + '.demo.yourrequest.nl';
        }
    }

    if (url !== false)
    {
        url = location.protocol + '//' + url + (location.port && !isNaN(location.port) ? ':' + location.port : '') + location.pathname + location.hash;
        console.warn('Redirecting to another URL: ' + url);
        window.location.replace(url);
    }

    return {
        type: SUBSCRIBER_SET,
        payload: {
            subscriber
        }
    }
}

export function validateAuthSession(subscriber) {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return jsonFetch('users.usersJSON.checkSession', {
            subscriber: subscriber
        }).then(response => {
            try {
                dispatch(setSubscriber(response.subscriber));
                dispatch(loginUserSuccess(response));
            } catch (e) {
                console.log('validateAuthSession', e);
                dispatch(loginUserFailure({
                    response: {
                        status: 403
                    }
                }));
            }
        })
        .catch(error => {
            dispatch(loginUserFailure(error));
        });
    }
}

export function validateLogin(username, password, subscriber) {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return jsonFetch('users.usersJSON.checkLogin', {
            username: username,
            password: password,
            subscriber: subscriber
        }).then(response => {
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
