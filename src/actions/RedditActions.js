import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';

export function selectReddit(reddit) {
    return {
        type: SELECT_REDDIT,
        reddit
    };
}

function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    };
}

function receivePosts(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit: reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    };
}

export function fetchPostsIfNeeded(reddit) {
    return dispatch => {
        dispatch(requestPosts(reddit));
        return fetch(`https://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(reddit, json)));
    };
}
