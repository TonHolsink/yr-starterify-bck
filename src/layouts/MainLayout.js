import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SideBar from '../components/sidebar/SideBar';
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';
import { version } from '../../package.json';

import './MainLayout.scss';
import './BoxLayout.scss';

class MainLayout extends Component {
    render() {
        const { children } = this.props;
        const logoLinkStyle = { background: '#fff' };
        const logoImageStyle = { width: '70px' };

        return (
            <div className="wrapper">

                <MainHeader/>

                {/* Left side column. contains the logo and sidebar */}
                <aside className="main-sidebar">
                    <section id="sidebar-placeholder" className="sidebar">
                        <SideBar/>
                    </section>
                </aside>

                {/* Content Wrapper. Contains page content */}
                <div id="content-placeholder" className="content-wrapper">
                    {children || 'Welcome to React Starterify'}
                </div>{/* /.content-wrapper */}

                <MainFooter/>

                {/* Control Sidebar */}
                <aside id="controlbar-placeholder" className="control-sidebar control-sidebar-dark">
                </aside>{/* /.control-sidebar */}
                {/* Add the sidebar's background. This div must be placed
                 immediately after the control sidebar */}
                <div className="control-sidebar-bg" />
            </div>
        );
    }
}

MainLayout.propTypes = {
    children: React.PropTypes.object
};

export default MainLayout;
