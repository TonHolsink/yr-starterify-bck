import React from 'react';
import { Link } from 'react-router';
import DropdownMenu from './DropdownMenu';
import UserAvatar from '../UserAvatar';

/**
 * Een dropdownmenu voor het tonen van berichten
 */
export default class MessageDropdownMenu extends DropdownMenu {

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
                <i class="fa fa-envelope-o"/>
                <span class="label label-success">7</span>
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
                <li class="header">U heeft 7 nieuwe berichten</li>
                <li>
                    <ul style={{overflowX: 'hidden', overflowY: 'auto', width: '100%', height: '200px'}}
                        class="menu">
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <div class="pull-left">
                                    <UserAvatar imageId="12"/>
                                </div>
                                <h4>
                                    Support Team
                                    <small><i class="fa fa-clock-o"/> 5 min</small>
                                </h4>
                                <p>Tekst van bericht #1</p>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <div class="pull-left">
                                    <UserAvatar imageId="13"/>
                                </div>
                                <h4>
                                    Design Team
                                    <small><i class="fa fa-clock-o"/> 2 uur</small>
                                </h4>
                                <p>Tekst van bericht #2</p>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <div class="pull-left">
                                    <UserAvatar imageId="14"/>
                                </div>
                                <h4>
                                    IT
                                    <small><i class="fa fa-clock-o"/> Vandaag</small>
                                </h4>
                                <p>Tekst van bericht #3</p>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <div class="pull-left">
                                    <UserAvatar imageId="15"/>
                                </div>
                                <h4>
                                    Sales
                                    <small><i class="fa fa-clock-o"/> Gisteren</small>
                                </h4>
                                <p>Tekst van bericht #4</p>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <div class="pull-left">
                                    <UserAvatar imageId="16"/>
                                </div>
                                <h4>
                                    Reviewers
                                    <small><i class="fa fa-clock-o"/> 2 dagen</small>
                                </h4>
                                <p>Tekst van bericht #5</p>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li class="footer">
                    <Link onClick={this.hideMenu} to="/">
                        Alle berichten
                    </Link>
                </li>
            </ul>
        )
    }
}
