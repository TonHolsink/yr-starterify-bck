import React, { Component } from 'react';
import SideBarMenu from './SideBarMenu';
import LoggedInUser from './LoggedInUser';

class SideBar extends Component {
    render() {
        return (

            <aside className="main-sidebar" {...this.props}>
                {/* sidebar: style can be found in sidebar.less */}
                <section style={{height: 'auto'}} className="sidebar" id="main-sidebar-section">

                    <LoggedInUser/>

                    {/* search form */}
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                            <input type="text" name="q" className="form-control" placeholder="Zoeken..."/>
                            <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"/></button>
                            </span>
                        </div>
                    </form>

                    {/* /.search form */}

                    {/* sidebar menu: : style can be found in sidebar.less */}
                    <SideBarMenu className="sidebar-menu" id="sidebar-menu"/>

                </section>
                {/* /.sidebar */}
            </aside>
        );
    }
}

export default SideBar;
