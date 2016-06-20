import React, {Component, PropTypes} from 'react';
import {setContentMinHeight} from './utils';

export default class TreeViewMenu extends Component {

    static propTypes = {
        handleClick: PropTypes.func,
        menu: PropTypes.object
    };

    static defaultProps = {
        menu: {}
    };

    constructor(props) {
        super(props);
        this.state = {toggle: false};
    }

    componentDidUpdate() {
        //Recalculates the min-height of the #content-placeholder to compensate for the expanded or contracted menu
        setContentMinHeight();
    }

    /**
     * Toont of verbergt het dropdownmenu.
     */
    toggleMenu() {
        this.setState({toggle: !this.state.toggle});

    };

    hideMenu() {
        this.setState({toggle: false});
    }

    handleClick = (ev) => {
        this.props.handleClick(ev, this);
    };

    /**
     * De header (de 'knop' om het dropdownmenu te openen)
     * @returns {XML}
     */
    renderHeader() {
        const menu = this.props.menu;
        return (
            <a onClick={this.handleClick} href="javascript:;">
                <i class={"fa " + menu.icon}/> <span>{menu.title}</span> <i class="fa fa-angle-left pull-right"/>
            </a>
        );
    }

    /**
     * Het dropdownmenu
     * @returns {XML}
     */
    renderMenu() {
        const items = this.props.menu.list.map((item, index) => {
            return (<li key={index}><a href={item.href} onClick={item.onClick}><i class={"fa " + item.icon}/> {item.title}</a></li>)
        });
        return (
            <ul style={this.state.toggle ? {display: 'block'} : {display: 'none'}}
                class={this.state.toggle ? "treeview-menu open" : "treeview-menu"}>
                {items}
            </ul>
        )
    }

    /**
     * Renderen van het component
     * @returns {XML}
     */
    render() {
        const {...props} = this.props;
        return (
            <li class={this.state.toggle ? "treeview active" : "treeview"} {...props}>
                {this.renderHeader()}
                {this.renderMenu()}
            </li>
        );
    }

}
