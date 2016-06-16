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
export default class CustomMenu extends Component {

    static propTypes = {
        onControlSideBarToggle: PropTypes.func.isRequired
    };

    render() {
        const {onControlSideBarToggle} = this.props;

        return (
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">

                    <MessageDropdownMenu cssClass="messages-menu" id="topbar-messages-placeholder"/>
                    <NotificationDropdownMenu cssClass="notifications-menu" id="topbar-notifications-placeholder"/>
                    <TaskDropdownMenu cssClass="tasks-menu" id="topbar-tasks-placeholder"/>
                    <AccountInfo cssClass="user user-menu" id="topbar-user-placeholder"/>

                    {/* Control Sidebar Toggle Button */}
                    <li><a href="#" onClick={onControlSideBarToggle} data-toggle="control-sidebar"><i class="fa fa-gears" /></a></li>
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onControlSideBarToggle: () => dispatch(controlSideBarToggle())
    }
};

export default connect(
    null,
    mapDispatchToProps
)(CustomMenu)
