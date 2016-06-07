import React, {Component, dangerouslySetInnerHTML} from 'react';
import {Provider} from 'react-redux';
import fetch from 'isomorphic-fetch';
import {toastr} from 'react-redux-toastr';

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
     return response.json()
}

export function jsonFetch(service, parameters) {
    let response;
    return fetch(window.backendURL + service, {
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(parameters || {})
    }).then(data => data.json()).catch(function(error) {
        console.error('Error in API service "' + service + '": ' + error, response);
    }).then(json => {
        if (json.errors)
        {
            console.error('Error in API service "' + service + '": ', json.errors);
            if (process.env.NODE_ENV !== 'production')
            {
                toastr.message('## API Backend error', {timeOut: 5000, component: () => {
                    return <div dangerouslySetInnerHTML={{__html: json.errors}} />;
                }});
            }
        }
        return json;
    });
}