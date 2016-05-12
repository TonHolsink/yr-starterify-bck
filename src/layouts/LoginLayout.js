import React, { Component, PropTypes } from 'react';
import { routerActions } from 'react-router-redux';
import { connect } from 'react-redux';

import { validateLogin } from '../actions/AuthActions';

import './LoginLayout.scss';

class LoginContainer extends Component {

    static propTypes = {
        validateLogin: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.ensureNotLoggedIn(this.props);
    };

    componentWillReceiveProps(nextProps) {
        this.ensureNotLoggedIn(nextProps);
    };

    ensureNotLoggedIn = (props) => {
        const { isAuthenticated, replace, redirect } = props;

        if (isAuthenticated) {
            replace(redirect);
        }
    };

    onClick = (e) => {
        e.preventDefault();
        this.props.validateLogin(this.refs.name.value, this.refs.password.value);
    };

    render() {
        return (
            <div>
                <div className="login-header">
                </div>
                <div className="login-page">
                    <div className="login-box">
                        <div className="login-box-body">
                            <p className="login-box-msg">U dient eerst in te loggen op</p>
                            <div className="login-logo">
                                <h1>Warmte-monitor</h1>
                                <span>Versie 0.3.0</span>
                            </div>

                            {this.props.statusText ? <div className='alert alert-error'>{this.props.statusText}</div> : ''}

                            <form id="loginform" action="/login" method="post">
                                <div className="form-group has-feedback">
                                    <input type="text" ref="name" className="form-control" placeholder="Gebruikersnaam" />
                                    <span className="glyphicon glyphicon-user form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="password" ref="password" className="form-control" placeholder="Wachtwoord" />
                                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                    </div>{/* /.col */}
                                    <div className="col-xs-4">
                                        <button onClick={this.onClick} type="submit" className="btn btn-primary btn-block btn-flat" disabled={this.props.isAuthenticating}>Inloggen</button>
                                    </div>{/* /.col */}
                                </div>
                            </form>
                            <a href="#">Wachtwoord vergeten</a><br />
                            <a href="register.html" className="text-center">Hulp aanvragen</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

function mapStateToProps(state, ownProps) {
    const isAuthenticated = state.authState.isAuthenticated || false;
    const redirect = ownProps.location.query.redirect || '/';
    const statusText = state.authState.statusText || '';

    return {
        isAuthenticated,
        redirect,
        statusText
    }
}

export default connect(mapStateToProps, { validateLogin, replace: routerActions.replace })(LoginContainer);
