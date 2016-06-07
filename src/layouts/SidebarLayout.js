import React, {Component, PropTypes} from 'react';
import SideBar from '../components/sidebar/SideBar';
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';
import {setContentMinHeight} from '../components/sidebar/utils';
import './SidebarLayout.scss'

export default class SidebarLayout extends Component {
    componentWillMount() {
        const body = document.body;
        body.className = 'hold-transition skin-yellow sidebar-mini';
    }

    handleResize() {
        setContentMinHeight();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const {children} = this.props;
        const footerMarginStyle = {marginBottom: '70px'};

        return (
            <div class="wrapper">

                <MainHeader/>
                <div class="subscriber-banner"/>
                <SideBar/>

                {/* Content Wrapper. Contains page content */}
                <div id="content-placeholder" className="content-wrapper" style={footerMarginStyle}>
                    {children || 'Welcome to React Starterify'}
                </div>{/* /.content-wrapper */}

                <MainFooter/>

                {/* Control Sidebar */}
                <aside id="controlbar-placeholder" className="control-sidebar control-sidebar-dark">
                </aside>{/* /.control-sidebar */}
                {/* Add the sidebar's background. This div must be placed
                 immediately after the control sidebar */}
                <div style={{position: 'fixed', height: 'auto'}} class="control-sidebar-bg"></div>

            </div>
        );
    }
}

SidebarLayout.propTypes = {
    children: React.PropTypes.object
};
