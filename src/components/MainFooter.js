import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './MainFooter.scss';

class MainFooter extends Component {
    render() {
        return (
            <footer className="main-footer" id="main-footer">
                <div className="pull-right hidden-xs">
                    <b>Version</b> 0.3.0
                </div>
                <strong>Copyright © 2014-2015 <a href="http://www.dimenzi.com">Q-More Warmte-monitor</a>.</strong> All rights reserved.
            </footer>
        );
    }
}

export default MainFooter;
