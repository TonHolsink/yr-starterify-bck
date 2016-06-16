import { combineReducers } from 'redux'
import {
    REQUEST_REPORTLIST, RECEIVE_REPORTLIST,
    REQUEST_REPORT, RECEIVE_REPORT
} from '../actions/ReportActions'

function reports(state = {
    isFetching: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_REPORTLIST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_REPORTLIST:
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
        case RECEIVE_REPORTLIST:
        case REQUEST_REPORTLIST:
            return reports(state[action.query], action);
        default:
            return state;
    }
}

function report(state = {
    isFetching: false,
    item: {}
}, action) {
    switch (action.type) {
        case REQUEST_REPORT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_REPORT:
            return Object.assign({}, state, {
                isFetching: false,
                item: action.report,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function reportByQuery(state = { }, action) {
    switch (action.type) {
        case RECEIVE_REPORT:
        case REQUEST_REPORT:
            return report(state[action.query], action);
        default:
            return state;
    }
}

// Don't forget to export the reducer the right way or it will not be properly available within the states
const rootReducer = combineReducers({
    reportsByQuery,
    reportByQuery
});

export default rootReducer;
