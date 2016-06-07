import React from 'react';
import { Link } from 'react-router';
import DropdownMenu from './DropdownMenu';

/**
 * Een dropdownmenu voor het tonen van taken
 */

export default class TaskDropdownMenu extends DropdownMenu {

    /**
     * De header (de 'knop' om het dropdownmenu te openen)
     * @override
     *
     * @returns {XML}
     */
    renderHeader() {
        return(
            <a onClick={this.toggleMenu} aria-expanded={this.state.toggle ? "true" : "false"} href="javascript:;"
               class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-flag-o"/>
                <span class="label label-danger">9</span>
            </a>
        );
    }

    /**
     * Het dropdownmenu
     * @override
     *
     * @returns {XML}
     */
    renderMenu() {
        return(
            <ul class="dropdown-menu">
                <li class="header">U heeft 9 taken</li>
                <li>
                    <ul style={{overflowX: 'hidden', overflowY: 'auto', width: '100%', height: '200px'}}
                        class="menu">
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <h3>
                                    Taak #1
                                    <small class="pull-right">20%</small>
                                </h3>
                                <div class="progress xs">
                                    <div class="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                        <span class="sr-only">20% Compleet</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <h3>
                                    Taak #2
                                    <small class="pull-right">40%</small>
                                </h3>
                                <div class="progress xs">
                                    <div class="progress-bar progress-bar-green" style={{width: '40%'}} role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                        <span class="sr-only">40% Compleet</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <h3>
                                    Taak #4
                                    <small class="pull-right">60%</small>
                                </h3>
                                <div class="progress xs">
                                    <div class="progress-bar progress-bar-red" style={{width: '60%'}} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                                        <span class="sr-only">60% Compleet</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <h3>
                                    Taak #5
                                    <small class="pull-right">80%</small>
                                </h3>
                                <div class="progress xs">
                                    <div class="progress-bar progress-bar-yellow" style={{width: '80%'}} role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                                        <span class="sr-only">80% Compleet</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li class="footer">
                    <Link onClick={this.hideMenu} to="/">
                        Toon alles
                    </Link>
                </li>
            </ul>
        )
    }
}
