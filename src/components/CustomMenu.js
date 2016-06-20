import React, {Component, PropTypes} from 'react';
import MessageDropdownMenu from './dropdownmenu/MessageDropdownMenu'
import NotificationDropdownMenu from './dropdownmenu/NotificationDropdownMenu'
import TaskDropdownMenu from './dropdownmenu/TaskDropdownMenu'
import AccountInfo from './dropdownmenu/AccountInfo'

import {connect} from 'react-redux'
import {controlSideBarToggle} from '../actions/AppActions'

/**
 * Custom menu balk
 */
class CustomMenu extends Component {

    static propTypes = {
        onControlSideBarToggle: PropTypes.func.isRequired,
        layout: PropTypes.string.isRequired
    };

    render() {
        const {layout, onControlSideBarToggle} = this.props;

        return (
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">

                    <MessageDropdownMenu cssClass="messages-menu" id="topbar-messages-placeholder"/>
                    <NotificationDropdownMenu cssClass="notifications-menu" id="topbar-notifications-placeholder"/>
                    <TaskDropdownMenu cssClass="tasks-menu" id="topbar-tasks-placeholder"/>
                    <AccountInfo cssClass="user user-menu" id="topbar-user-placeholder"/>

                    {layout === 'sidebar' ? <li><a href="javascript:void(0)" onClick={onControlSideBarToggle} data-toggle="control-sidebar"><i class="fa fa-gears" /></a></li> : ''}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        layout: state.appState.layout
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onControlSideBarToggle: () => dispatch(controlSideBarToggle())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomMenu)
