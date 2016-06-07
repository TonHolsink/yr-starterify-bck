import {jsonFetch} from '../utils';

export const REQUEST_REPORTS = 'REQUEST_REPORTS';
export const RECEIVE_REPORTS = 'RECEIVE_REPORTS';

function requestReports(query) {
    return {
        type: REQUEST_REPORTS,
        query
    };
}

function receiveReports(query, json) {
    return {
        type: RECEIVE_REPORTS,
        query: query,
        reports: json.result,
        receivedAt: Date.now()
    };
}

export function fetchReports(query) {
    return (dispatch) => {
        dispatch(requestReports(query));
        return jsonFetch('items.formReportsJSON.getFormReports').then(json => dispatch(receiveReports(query, json)));
    };
}