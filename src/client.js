import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';
import { Router, hashHistory } from 'react-router';
import DevTools from './devtools';
import getRoutes from './router';
import { syncHistoryWithStore } from 'react-router-redux';

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

const store = Store();

const routes = (
    <Router history={hashHistory}>
        {getRoutes(store)}
    </Router>
);

render(
    (<Provider store={store}><div style={{height: '100%'}}>{routes}
        {process.env.NODE_ENV !== 'production' && <DevTools/>}
    </div></Provider>), document.getElementById('main-body-content')
);