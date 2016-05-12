import fetch from 'isomorphic-fetch';

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
        return fetch('http://demo.q-more.nl/services/items.formReportsJSON.getFormReports', {
        method: 'post',
            body: JSON.stringify({query: query})
        })
            .then(response => response.json())
            .then(json => dispatch(receiveReports(query, json)));
    };
}