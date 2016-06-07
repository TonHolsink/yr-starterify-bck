import React, {Component, PropTypes} from 'react';
import TreeViewMenu from './TreeViewMenu'
import SideBarLink from './SideBarLink';
import './SidebarMenu.scss';
import { setContentMinHeight } from './utils';

export default class SideBarMenu extends Component {

    static propTypes = {
        allowMultiple: PropTypes.bool
    };

    static defaultProps = {
        allowMultiple: false
    };

    tvRefs = [];
    tvItems = [
        <TreeViewMenu handleClick={this.handleTreeViewMenuClick.bind(this)} ref={(ref) => this.tvRefs.push(ref)}
                      menu={
                             {
                                title: 'Dashboard',
                                icon: 'fa-dashboard',
                                list: [
                                    {title: 'Dashboard v1', href: '#', icon: 'fa-circle-o'},
                                    {title: 'Dashboard v2', href: '#', icon: 'fa-circle-o'}
                                ]
                            }
                      }
        />,
        <TreeViewMenu handleClick={this.handleTreeViewMenuClick.bind(this)} ref={(ref) => this.tvRefs.push(ref)}
                      menu={
                            {
                                title: 'Kanalen',
                                icon: 'fa-globe',
                                list: [
                                    {title: 'Telefonie', href: '#', icon: 'fa-phone'},
                                    {title: 'E-mail', href: '#', icon: 'fa-envelope'},
                                    {title: 'Workflow', href: '#', icon: 'fa-map-signs'},
                                    {title: 'Chat', href: '#', icon: 'fa-commenting'},
                                    {title: 'Outbound', href: '#', icon: 'fa-mail-forward'},
                                    {title: 'Post', href: '#', icon: 'fa-inbox'}
                                ]
                            }
                      }
        />
    ];

    componentDidMount() {
        setContentMinHeight();
    }

    handleTreeViewMenuClick(ev, el) {
        if (this.props.allowMultiple) {
            el.toggleMenu();
        } else {
            this.tvRefs.forEach((ref) => {
                if (ref === el) {
                    el.toggleMenu();
                } else {
                    ref.hideMenu();
                }
            });
        }
    }

    render() {
        let tv_idx = 0;
        return (
            <ul {...this.props}>
                <li class="header">NAVIGATIE MENU</li>
                {this.tvItems[tv_idx++]}
                {this.tvItems[tv_idx++]}
                {this.tvItems[tv_idx++]}
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
                    <SideBarLink to="/reports" icon="fa fa-weixin" label="Meldingen"/>
                </li>
                <li>
                    <SideBarLink to="/counter" icon="fa fa-weixin" label="Counter"/>
                </li>
                <li>
                    <SideBarLink to="/toastrtest" icon="fa fa-weixin" label="Toastr test"/>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-archive"/> <span>Archief</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-gear"/> <span>Beheer</span>
                    </a>
                </li>
                <li class="header">LABELS</li>
                <li><a href="#"><i class="fa fa-circle-o text-red"/> <span>Belangrijk</span></a></li>
                <li><a href="#"><i class="fa fa-circle-o text-yellow"/> <span>Let op</span></a></li>
                <li><a href="#"><i class="fa fa-circle-o text-aqua"/> <span>Informatie</span></a></li>
            </ul>
        )
    }
}
