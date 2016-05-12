import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SideBarLink from './SideBarLink';
import LoggedInUser from './LoggedInUser';
import styles from './SideBar.scss';

class SideBar extends Component {
    render() {
        return (

            <aside className={styles.mainsidebar}>
                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar">

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
                    <ul className="sidebar-menu">
                        <li className="header">NAVIGATIE MENU</li>
                        <li className="active treeview">
                            <a href="#">
                                <i className="fa fa-dashboard"/> <span>Dashboard</span>
                            </a>
                        </li>
                        <li data-bind="teams-selection-tpl" className="treeview"/>
                        <li data-bind="workgroups-selection-tpl" className="treeview"/>
                        <li>
                            <a href="#">
                                <i className="fa fa-globe"/>
                                <span>Kanalen</span>
                            </a>
                            <ul className="treeview-menu" data-bind="businessline"
                                data-businessline="{{business_line}}">
                                <li><a href="#"><i className="fa fa-phone"/>Telefonie</a></li>
                                <li><a href="#"><i className="fa fa-envelope"/>E-mail</a></li>
                                <li><a href="#"><i className="fa fa-map-signs"/>Workflow</a></li>
                                <li><a href="#"><i className="fa fa-commenting"/>Chat</a></li>
                                <li><a href="#"><i className="fa fa-mail-forward"/>Outbound</a></li>
                                <li><a href="#"><i className="fa fa-inbox"/>Post</a></li>
                            </ul>
                        </li>
                        <li>
                            <SideBarLink to="/about" label="About"/>
                        </li>
                        <li>
                            <SideBarLink to="/forms" label="Formulieren"/>
                        </li>
                        <li>
                            <SideBarLink to="/fileupload" label="Fileupload"/>
                        </li>
                        <li>
                            <SideBarLink to="/redux-forms" label="Redux-forms" inColor="red" inNumber="3"/>
                        </li>
                        <li>
                            <SideBarLink to="/reports" icon="fa fa-weixin" label="Rapportages"/>
                        </li>
                        <li>
                            <SideBarLink to="/counter" icon="fa fa-weixin" label="Counter"/>
                        </li>
                        <li>
                            <SideBarLink to="/notifytest" icon="fa fa-weixin" label="Notify test"/>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-archive"/> <span>Archief</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-gear"/> <span>Beheer</span>
                            </a>
                        </li>
                        <li className="header">LABELS</li>
                        <li><a href="#"><i className="fa fa-circle-o text-red"/> <span>Belangrijk</span></a></li>
                        <li><a href="#"><i className="fa fa-circle-o text-yellow"/> <span>Let op</span></a></li>
                        <li><a href="#"><i className="fa fa-circle-o text-aqua"/> <span>Informatie</span></a></li>
                    </ul>
                </section>
                {/* /.sidebar */}
            </aside>
        );
    }
}

export default SideBar;
