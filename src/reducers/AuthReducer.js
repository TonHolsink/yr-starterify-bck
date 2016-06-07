import { createReducer } from '../utils';
import { USER_LOGGED_IN,USER_LOGGED_OUT,LOGIN_USER_FAILURE, LOGIN_AUTHENTICATING } from '../actions/AuthActions'

const initialState = {
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    statusError: true
};

export default createReducer(initialState, {
    [LOGIN_AUTHENTICATING]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [USER_LOGGED_IN]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'user': payload.user,
            'statusText': 'U bent ingelogd.',
            'statusError': false
        });

    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'user': null,
            'statusText': payload.statusText && `Inloggen mislukt: ${payload.statusText}`,
            'statusError': true
        });
    },
    [USER_LOGGED_OUT]: (state) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'user': null,
            'statusText': 'U bent uitgelogd.',
            'statusError': false
        });
    }
});
