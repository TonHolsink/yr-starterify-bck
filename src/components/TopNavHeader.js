import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {layoutChange} from '../actions/AppActions';
import {Link} from 'react-router';
import CustomMenu from './CustomMenu';

import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class TopNavHeader extends Component {

    static propTypes = {
        onLayoutChange: PropTypes.func,
        subscriber: PropTypes.object
    };

    render() {
        const { subscriberName } = this.props.subscriber;
        const nameInSiderbar = subscriberName && subscriberName.capitalizeFirstLetter();

        return (
            <header className="main-header">
                {/* Header Navbar: style can be found in header.less */}
                <Navbar staticTop>

                    <div class="container">
                        <div class="navbar-header">
                            {/* Logo */}
                            <Link className="navbar-brand" to="/">
                                <b>{nameInSiderbar}</b>
                            </Link>
                            <Link className="navbar-brand" to="/"/>
                            <Navbar.Toggle/>
                        </div>
                        <Navbar.Collapse style={{float: 'left'}}>
                            <Nav>
                                <NavItem eventKey={1} href="#" onSelect={() => this.props.onLayoutChange('sidebar')}>Sidebar</NavItem>
                                <NavItem eventKey={2} href="#">Link</NavItem>
                                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1}>Action</MenuItem>
                                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                                </NavDropdown>
                            </Nav>
                            <form class="navbar-form navbar-left" role="search">
                                <div class="form-group">
                                    <input class="form-control" id="navbar-search-input" placeholder="Search" type="text"/>
                                </div>
                            </form>
                        </Navbar.Collapse>

                        <CustomMenu />

                    </div>
                </Navbar>
            </header>
        );
    }
}

function mapStateToProps(state) {
    const subscriber = state.authState.subscriber || false;
    return {
        subscriber
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLayoutChange: (layout) => dispatch(layoutChange(layout))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNavHeader)
