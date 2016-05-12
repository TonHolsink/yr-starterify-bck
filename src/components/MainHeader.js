import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CounterStatus from '../components/CounterStatus';
import AccountInfo from '../components/AccountInfo';

import styles from './MainHeader.scss';

class MainHeader extends Component {

    onClickSideBar = (e) => {
        console.log('ckuck');
        e.preventDefault();

    };

    render() {
        return (
            <header className={styles.mainheader}>
                {/* Logo */}
                <Link className="logo" to="/"/>
                {/* Header Navbar: style can be found in header.less */}
                <nav className="navbar navbar-static-top" role="navigation">
                    {/* Sidebar toggle button*/}
                    <a href="#" onClick={this.onClickSideBar} className="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>

                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            {/* Messages dropdown */}
                            <li id="topbar-messages-placeholder" className="dropdown messages-menu" />
                            {/* Notifications dropdown */}
                            <li id="topbar-notifications-placeholder" className="dropdown notifications-menu" />
                            {/* Tasks dropdown */}
                            <li id="topbar-tasks-placeholder" className="dropdown tasks-menu" />
                            {/* User Account dropdown */}

                            <AccountInfo/>


                            {/* Control Sidebar Toggle Button */}
                            <li><a href="#" data-toggle="control-sidebar"><i className="fa fa-gears" /></a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default MainHeader;