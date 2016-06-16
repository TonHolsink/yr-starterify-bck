import React, {Component, PropTypes} from 'react';
import SideBar from '../components/sidebar/SideBar';
import ControlSideBar from '../components/sidebar/ControlSideBar';
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';
import {setContentMinHeight} from '../components/sidebar/utils';
import {connect} from 'react-redux';
import './SidebarLayout.scss'

class SidebarLayout extends Component {

    static propTypes = {
        children: PropTypes.object,
        skin: PropTypes.string.isRequired
    };

    componentWillMount() {
        const body = document.body;
        body.className = `hold-transition ${this.props.skin} sidebar-mini`;
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

        const locationResources = window.backendURL + this.props.subscriber.locationResources;
        const resourcesHeader = {backgroundImage: 'url(' + locationResources + 'img/header.jpg)'};

        return (
            <div class="wrapper">

                <MainHeader/>
                <div class="subscriber-banner" style={resourcesHeader}/>
                <SideBar/>

                {/* Content Wrapper. Contains page content */}
                <div id="content-placeholder" className="content-wrapper" style={footerMarginStyle}>
                    {children || 'Welcome to React Starterify'}
                </div>
                {/* /.content-wrapper */}

                <MainFooter/>

                <ControlSideBar />
                {/* Add the sidebar's background. This div must be placed immediately after the control sidebar */}
                <div style={{position: 'fixed', height: 'auto'}} class="control-sidebar-bg"></div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const skin = state.appState.skin;
    const subscriber = state.authState.subscriber || false;
    return {
        skin,
        subscriber
    }
}
export default connect(
    mapStateToProps
)(SidebarLayout);
