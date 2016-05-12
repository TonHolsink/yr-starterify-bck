import React, { Component } from 'react';
import { Link } from 'react-router';

class SideBarLink extends Component {

    static defaultProps = {
        title: 'Titel'
    };

    render() {
        return (
            <section className="content-header">
                <h1>
                    {this.props.title}
                    <small>Version 2.0</small>
                </h1>
                <ol className="breadcrumb">
                    <li><Link to="/"><i className="fa fa-dashboard"/> Home</Link></li>
                    <li className="active">{this.props.title}</li>
                </ol>
            </section>
        );
    }
}

export default SideBarLink;
