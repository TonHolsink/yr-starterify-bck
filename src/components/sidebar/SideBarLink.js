import React, { Component } from 'react';
import { Link } from 'react-router';

class SideBarLink extends Component {

    static defaultProps = {
        to: '/',
        icon: 'fa fa-globe',
        label: 'label',
        color: 'red',
        activeClassName: 'active'
    };

    render() {
        return (
            <Link {...{ to: this.props.to, activeClassName: this.props.activeClassName }}>
                <i {...{ className: this.props.icon }}/><span>{this.props.label}</span>
                {
                    this.props.inNumber &&
                    <small {...{ className: 'label pull-right bg-' + this.props.color }}>{this.props.inNumber}</small>
                }
            </Link>
        );
    }
}

export default SideBarLink;
