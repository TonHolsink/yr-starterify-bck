import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import TopNavHeader from '../components/TopNavHeader';
import MainFooter from '../components/MainFooter';

class TopNavLayout extends Component {

    static propTypes = {
        children: PropTypes.object,
        skin: PropTypes.string.isRequired
    };

    componentWillMount() {
        const body = document.body;
        body.className = `${this.props.skin} layout-top-nav`;
    }
    
    render() {
        const { children } = this.props;
        const footerMarginStyle = { marginBottom: '70px' };
        const locationResources = window.backendURL + this.props.subscriber.locationResources;
        const resourcesHeader = {backgroundImage: 'url(' + locationResources + 'img/header.jpg)'};

        return (
            <div className="wrapper">

                <TopNavHeader/>
                <div class="subscriber-banner" style={resourcesHeader}/>

                {/* Content Wrapper. Contains page content */}
                <div id="content-placeholder" className="content-wrapper" style={footerMarginStyle}>
                    {children || 'Welcome to React Starterify'}
                </div>{/* /.content-wrapper */}

                <MainFooter/>

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
)(TopNavLayout);
