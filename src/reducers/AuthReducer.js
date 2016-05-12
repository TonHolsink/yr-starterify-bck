import { createReducer } from '../utils';
import { USER_LOGGED_IN,USER_LOGGED_OUT,LOGIN_USER_FAILURE, LOGIN_AUTHENTICATING } from '../actions/AuthActions'

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
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
            'token': payload.token,
            'user': payload.user,
            'statusText': 'You have been successfully logged in.'
        });

    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'user': null,
            'statusText': `Inloggen mislukt: ${payload.statusText}`
        });
    },
    [USER_LOGGED_OUT]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'user': null,
            'statusText': 'You have been successfully logged out.'
        });
    }
});
