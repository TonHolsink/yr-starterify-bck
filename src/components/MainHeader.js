import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CustomMenu from './CustomMenu';
import array from 'lodash/array';
import {setContentMinHeight} from './sidebar/utils';


class MainHeader extends Component {

    onClickSideBar = (e) => {
        const body = document.body;
        let classes = body.className.split(" ");
        const width = window.innerWidth;
        const c = (width < 768) ? 'sidebar-open' : 'sidebar-collapse';
        (classes.indexOf(c) === -1) ? classes.push(c) : classes = array.without(classes, c);
        body.className = classes.join(' ');
        setContentMinHeight();
        e.preventDefault();
    };

    render() {
        return (
            <header className="main-header">
                {/* Logo */}
                <Link className="logo" to="/">
                    <span class="logo-mini"><b>Q</b></span>
                    <span class="logo-lg"><b>Q-more</b></span>
                </Link>
                {/* Header Navbar: style can be found in header.less */}
                <nav className="navbar navbar-static-top" role="navigation">
                    {/* Sidebar toggle button*/}
                    <a href="#" onClick={this.onClickSideBar} className="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>

                    <CustomMenu />

                </nav>
            </header>
        );
    }
}

export default MainHeader;
