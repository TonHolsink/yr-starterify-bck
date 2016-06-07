import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper';

// Layouts
import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';

// Pages
import HomepageContainer from './containers/HomeContainer';
import FormsContainer from './containers/FormsContainer';
import ReduxFormsContainer from './containers/ReduxFormsContainer';
import FileUploadContainer from './containers/FileUploadContainer';
import AboutContainer from './containers/AboutContainer';
import ReportListContainer from './containers/ReportListContainer';
import ReportContainer from './containers/Report/ReportContainer';
import CounterCountainer from './containers/CounterContainer';
import ToastrTestContainer from './containers/ToastrTestContainer';

export default (store) => {

    const UserIsAuthenticated = UserAuthWrapper({
        authSelector: state => state.authState,
        redirectAction: routerActions.replace,
        wrapperDisplayName: 'UserIsAuthenticated',
        predicate: authState => authState.isAuthenticated,
    });

    const UserIsAdmin = UserAuthWrapper({
        authSelector: state => state.authState,
        redirectAction: routerActions.replace,
        failureRedirectPath: '/',
        wrapperDisplayName: 'UserIsAdmin',
        predicate: user => user.isAdmin,
        allowRedirectBack: false
    });

    return (
        <Route>
            <Route path="/login" component={LoginLayout}/>
            <Route component={UserIsAuthenticated(MainLayout)}>
                <Route path="/" component={HomepageContainer}/>
                <Route path="/forms" component={FormsContainer}/>
                <Route path="/redux-forms" component={ReduxFormsContainer}/>
                <Route path="/fileupload" component={FileUploadContainer}/>
                <Route path="/about" component={AboutContainer}/>
                <Route path="/reports" component={ReportListContainer}/>
                <Route path="/report/:id" component={ReportContainer}/>
                <Route path="/counter" component={CounterCountainer}/>
                <Route path="/toastrtest" component={ToastrTestContainer}/>
            </Route>
        </Route>
    );
};
