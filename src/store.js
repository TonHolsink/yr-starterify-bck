import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createReducer from './reducers/index';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import DevTools from './devtools';

export default function configureStore(initialState) {

    const enhancer = compose(

        //Used for async data fetching
        applyMiddleware(thunkMiddleware),

        //Used for authentication
        applyMiddleware(routerMiddleware(hashHistory)),

        // Middleware you want to use in development:
        DevTools.instrument()
    );

    const store = createStore(
        createReducer(routerReducer),
        initialState,
        enhancer
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers/index', () => {
            const nextRootReducer = require('./reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}