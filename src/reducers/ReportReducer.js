import { combineReducers } from 'redux'
import {
    REQUEST_REPORTS, RECEIVE_REPORTS
} from '../actions/ReportActions'

function reports(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_REPORTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_REPORTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.reports,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function reportsByQuery(state = { }, action) {
    switch (action.type) {
        case RECEIVE_REPORTS:
        case REQUEST_REPORTS:
            return reports(state[action.query], action);
        default:
            return state;
    }
}

// Don't forget to export the reducer the right way or it will not be properly available within the states
const rootReducer = combineReducers({
    reportsByQuery
});

export default rootReducer;