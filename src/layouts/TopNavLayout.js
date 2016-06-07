import React, { Component, PropTypes } from 'react';
import SideBar from '../components/sidebar/SideBar';
import TopNavHeader from '../components/TopNavHeader';
import MainFooter from '../components/MainFooter';

// import './MainLayout.scss';
// import './BoxLayout.scss';

export default class TopNavLayout extends Component {
    componentWillMount() {
        const body = document.body;
        body.className = 'skin-yellow layout-top-nav';
    }
    render() {
        const { children } = this.props;
        const footerMarginStyle = { marginBottom: '70px' };

        return (
            <div className="wrapper">

                <TopNavHeader/>
                <div class="subscriber-banner"/>

                {/* Content Wrapper. Contains page content */}
                <div id="content-placeholder" className="content-wrapper" style={footerMarginStyle}>
                    {children || 'Welcome to React Starterify'}
                </div>{/* /.content-wrapper */}

                <MainFooter/>

            </div>
        );
    }
}

TopNavLayout.propTypes = {
    children: React.PropTypes.object
};
