import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import CustomMenu from './CustomMenu';


export default class TopNavHeader extends Component {

    onClickToggle = (e) => {
        console.log('KLIK');
        e.preventDefault();
    };

    render() {
        return (
            <header className="main-header">
                {/* Header Navbar: style can be found in header.less */}
                <nav className="navbar navbar-static-top" role="navigation">
                    <div class="container">
                        <div class="navbar-header">
                            {/* Logo */}
                            <Link className="logo nav-bar-brand" to="/"/>
                            <button type="button" onClick={this.onClickToggle}
                                    class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                                <i class="fa fa-bars"></i>
                            </button>
                        </div>
                        <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
                            <ul class="nav navbar-nav">
                                <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                                <li><a href="#">Link</a></li>
                                <li class="dropdown">
                                    <a aria-expanded="false" href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">Separated link</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">One more separated link</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <form class="navbar-form navbar-left" role="search">
                                <div class="form-group">
                                    <input class="form-control" id="navbar-search-input" placeholder="Search" type="text"/>
                                </div>
                            </form>
                        </div>

                        <CustomMenu />

                    </div>
                </nav>
            </header>
        );
    }
}
