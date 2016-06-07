import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';
import { Router, hashHistory } from 'react-router';
import DevTools from './devtools';
import getRoutes from './router';
import { syncHistoryWithStore } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';
import { validateAuthSession } from './actions/AuthActions';

/*
Nog niet zeker waarom dit moet. Levert nu fouten op wanneer React soms wordt vergeten te importeren in bepaalde componenten
Andere oplossing is dit toe te voegen aan de webpack config aan de plugin sectie:
 new webpack.ProvidePlugin({
 "React": "react",
 }),
 ------
if (process.env.NODE_ENV !== 'production') {
    window.React = React;
}
*/

//Determine URL for backend environment
if (process.env.NODE_ENV !== 'production') {
    window.backendURL = 'http://demo.q-more.nl/services/';
} else {
    window.backendURL = 'http://demo.yourrequest.nl/services/';
}

const store = Store();
//localStorage.getItem('token');
store.dispatch(validateAuthSession());

window.getSubscriber = function() {
    const DEFAULT = 'default';
    let subscriber = DEFAULT;
    try {
        subscriber = store.getState().authState.user.subscriber.code || DEFAULT;
    } catch (e) {
    }
    return subscriber
};

const routes = (
    <Router history={hashHistory}>
        {getRoutes(store)}
    </Router>
);

render(
    (<Provider store={store}>
        <div style={{height: '100%'}}>{routes}
            {process.env.NODE_ENV !== 'production' && <DevTools/>}
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                position="top-right"
            />
        </div>
    </Provider>), document.getElementById('main-body-content')
);
