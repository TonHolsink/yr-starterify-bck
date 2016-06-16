import {jsonFetch} from '../utils';

export const REQUEST_REPORTLIST = 'REQUEST_REPORTLIST';
export const RECEIVE_REPORTLIST = 'RECEIVE_REPORTLIST';
export const REQUEST_REPORT = 'REQUEST_REPORT';
export const RECEIVE_REPORT = 'RECEIVE_REPORT';

function requestReportList(query) {
    return {
        type: REQUEST_REPORTLIST,
        query
    };
}

function receiveReportList(query, json) {
    return {
        type: RECEIVE_REPORTLIST,
        query: query,
        reports: json.result,
        receivedAt: Date.now()
    };
}

export function fetchReportList(query) {
    return (dispatch) => {
        dispatch(requestReportList(query));
        return jsonFetch('items.formReportsJSON.getFormReports').then(json => dispatch(receiveReportList(query, json)));
    };
}

function requestReport(query) {
    return {
        type: REQUEST_REPORT,
        query
    };
}

function receiveReport(query, json) {
    return {
        type: RECEIVE_REPORT,
        query: query,
        report: json.formreport,
        receivedAt: Date.now()
    };
}

export function fetchReportByNumber(query) {
    return (dispatch) => {
        dispatch(requestReport(query));
        return jsonFetch('items.formreportsJSON.getFormReportByNumber', query).then(json => dispatch(receiveReport(query, json)));
    };
}
