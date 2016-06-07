import React from 'react';
import { Link } from 'react-router';
import DropdownMenu from './DropdownMenu';

/**
 * Een dropdownmenu voor het tonen van notificaties
 */
export default class NotificationDropdownMenu extends DropdownMenu {

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
                <i class="fa fa-bell-o"/>
                <span class="label label-warning">4</span>
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
                <li class="header">U heeft 10 notificaties</li>
                <li>
                    <ul style={{overflowX: 'hidden', overflowY: 'auto', width: '100%', height: '200px'}}
                        class="menu">
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <i class="fa fa-users text-aqua"/> 5 nieuwe klanten
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <i class="fa fa-warning text-yellow"/> Erg lange tekst die niet past en eventueel voor designproblemen zorgt.
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <i class="fa fa-users text-red"/> Er is een probleeLink>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <i class="fa fa-shopping-cart text-green"/> 25 items verkocht
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this.hideMenu} to="/">
                                <i class="fa fa-user text-red"/> U heeft uw gebruikersnaam gewijzigd
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
