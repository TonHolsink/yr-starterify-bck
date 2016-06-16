import React, {Component} from 'react';
import MessageDropdownMenu from './dropdownmenu/MessageDropdownMenu'
import NotificationDropdownMenu from './dropdownmenu/NotificationDropdownMenu'
import TaskDropdownMenu from './dropdownmenu/TaskDropdownMenu'
import AccountInfo from './dropdownmenu/AccountInfo'

import {EventEmitter} from 'events';


/**
 * Custom menu balk
 */
export default class CustomMenu extends Component {

    constructor(props) {
        super(props);
        window.controlsidebaremitter = new EventEmitter();
    }

    onClickControlBar = (e) => {
        window.controlsidebaremitter.emit('toggle-controlbar');
        console.log('EMIT');
        e.preventDefault();
    };

    render() {
        return (
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">

                    <MessageDropdownMenu cssClass="messages-menu" id="topbar-messages-placeholder"/>
                    <NotificationDropdownMenu cssClass="notifications-menu" id="topbar-notifications-placeholder"/>
                    <TaskDropdownMenu cssClass="tasks-menu" id="topbar-tasks-placeholder"/>
                    <AccountInfo cssClass="user user-menu" id="topbar-user-placeholder"/>

                    {/* Control Sidebar Toggle Button */}
                    <li><a href="#" onClick={this.onClickControlBar} data-toggle="control-sidebar"><i class="fa fa-gears" /></a></li>
                </ul>
            </div>
        );
    }
}
