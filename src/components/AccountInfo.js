import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import UserAvatar from './UserAvatar';
import Overlay from 'react-bootstrap/lib/Overlay';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import styles from './AccountInfo.scss';

class AccountInfo extends Component {
    
    render() {

        const accountInfo = (<ul className="dropdown-menu" style={{display: 'block'}}>
            {/* User image */}
            <li className={styles.header}>

                <UserAvatar imageId={this.props.isAuthenticated && this.props.user.image.id} />

                <p>
                    {this.props.isAuthenticated ?
                        this.props.user.fullname : 'Onbekende gebruiker'}
                    <small>Member since Nov. 2012</small>
                </p>
            </li>
            {/* Menu Body */}
            <li className={styles.body}>
                <div className="row">
                    <div className="col-xs-4 text-center">
                        <a href="#">Followers</a>
                    </div>
                    <div className="col-xs-4 text-center">
                        <a href="#">Sales</a>
                    </div>
                    <div className="col-xs-4 text-center">
                        <a href="#">Friends</a>
                    </div>
                </div>
                {/* /.row */}
            </li>
            {/* Menu Footer*/}
            <li className="user-footer">
                <div className="pull-left">
                    <a href="#" className="btn btn-default btn-flat">Profile</a>
                </div>
                <div className="pull-right">
                    <a href="#" className="btn btn-default btn-flat">Sign out</a>
                </div>
            </li>
        </ul>);

        return (
            <li className="dropdown user user-menu">

                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={accountInfo}>
                    <a onClick={(e) => {e.preventDefault();}} refs="target" href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <UserAvatar className="user-image" imageId={this.props.isAuthenticated && this.props.user.image.id} />
                        <span className="hidden-xs">{this.props.isAuthenticated ?
                        this.props.user.fullname : 'Onbekende gebruiker'}</span>
                    </a>
                </OverlayTrigger>

            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authState.user,
        isAuthenticated: state.authState.isAuthenticated
    }
};

export default connect(mapStateToProps)(AccountInfo);