import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import UserAvatar from '../UserAvatar';

class LoggedInUser extends Component {

    render() {
        return (
            <div className="user-panel">
                <div className="pull-left image">
                    <UserAvatar imageId={this.props.isAuthenticated && this.props.user.image.id} />
                </div>
                <div className="pull-left info">
                    <p>{this.props.isAuthenticated ?
                            this.props.user.fullname : 'Onbekende gebruiker'}</p>
                    <a href="#"><i className="fa fa-circle text-success" /> Online</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authState.user,
        isAuthenticated: state.authState.isAuthenticated
    }
};

export default connect(mapStateToProps)(LoggedInUser);
