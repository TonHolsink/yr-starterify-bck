import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './MainFooter.scss';

class MainFooter extends Component {
    render() {

        const { serviceName, subscriberName } = this.props.subscriber;

        return (
            <footer className="main-footer" id="main-footer">
                <div className="pull-right hidden-xs">
                    <b>Version</b> 0.3.0
                </div>
                <strong>Copyright © 2014-2015 <a href="http://www.yourrequest.nl">{subscriberName.capitalizeFirstLetter()} {serviceName.capitalizeFirstLetter()}</a>.</strong> All rights reserved.
            </footer>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const subscriber = state.authState.subscriber || false;
    return {
        subscriber
    }
}

export default connect(mapStateToProps)(MainFooter);
