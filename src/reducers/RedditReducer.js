import { combineReducers } from 'redux'
import {
    SELECT_REDDIT,
    REQUEST_POSTS, RECEIVE_POSTS
} from '../actions/RedditActions'

function selectedReddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_REDDIT:
            return action.reddit;
        default:
            return state;
    }

    return state;
}

function posts(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function postsByReddit(state = { }, action) {

    switch (action.type) {
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            let test = Object.assign({}, state, {
                [action.reddit]: posts(state[action.reddit], action)
            });
            return test;

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    postsByReddit,
    selectedReddit
});

export default rootReducer
