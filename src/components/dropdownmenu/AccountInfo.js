import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import {connect} from 'react-redux';
import UserAvatar from '../UserAvatar';
import DropdownMenu from './DropdownMenu';

import {logoutSession} from '../../actions/AuthActions';

/**
 * Een dropdownmenu voor het tonen user account informatie met de mogelijkheid om uit te loggen
 */
export default class AccountInfo extends DropdownMenu {

    static propTypes = {
        logoutSession: PropTypes.func.isRequired
    };

    /**
     * Klikken op de logout knop logt de gebuiker uit
     * @param e SyntheticEvent
     */
    logOutClick = (e) => {
        e.preventDefault();
        this.props.logoutSession();
    };

    /**
     * De header (de 'knop' om het dropdownmenu te openen)
     * @override
     *
     * @returns {XML}
     */
    renderHeader() {
        return (
            <a onClick={this.toggleMenu} aria-expanded={this.state.toggle ? "true" : "false"} href="javascript:;"
               class="dropdown-toggle" data-toggle="dropdown">
                <UserAvatar class="user-image"
                            imageId={this.props.isAuthenticated && this.props.user.image && this.props.user.image.id}/>
                <span
                    class="hidden-xs">{this.props.isAuthenticated ? this.props.user.fullname : 'Onbekende gebruiker'}</span>
            </a>
        );
    }

    /**
     * Het dropdownmenu
     * @override
     *
     * @returns {XML}
     */
    renderMenu() {
        return (
            <ul class="dropdown-menu">
                <li class="user-header">
                    <UserAvatar
                        imageId={this.props.isAuthenticated && this.props.user.image && this.props.user.image.id}/>

                    <p>
                        {this.props.isAuthenticated ?
                            this.props.user.fullname : 'Onbekende gebruiker'}
                        <small>Member since Nov. 2012</small>
                    </p>
                </li>
                <li class="user-body">
                    <div class="row">
                        <div class="col-xs-4 text-center">
                            <Link onClick={this.hideMenu} to="/">Followers</Link>
                        </div>
                        <div class="col-xs-4 text-center">
                            <Link onClick={this.hideMenu} to="/">Sales</Link>
                        </div>
                        <div class="col-xs-4 text-center">
                            <Link onClick={this.hideMenu} to="/">Friends</Link>
                        </div>
                    </div>
                </li>
                <li class="user-footer">
                    <div class="pull-left">
                        <Link onClick={this.hideMenu} to="/" class="btn btn-default btn-flat">Profile</Link>
                    </div>
                    <div class="pull-right">
                        <Link id='btn-user-logout' onClick={this.logOutClick} to="/" class="btn btn-default btn-flat">Sign out</Link>
                    </div>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authState.user,
        isAuthenticated: state.authState.isAuthenticated
    }
};

export default connect(mapStateToProps, {logoutSession})(AccountInfo);
