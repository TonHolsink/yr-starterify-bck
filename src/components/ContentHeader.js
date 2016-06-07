import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ContentHeader extends Component {

    static propTypes = {
        title: PropTypes.string,
        crumbs: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        title: 'Titel',
        crumbs: []
    };

    render() {
        const {title, crumbs} = this.props;
        let key = 0;
        return (
            <section class="content-header">
                <h1>{title}</h1>
                <ol class="breadcrumb">
                    <li><Link to="/">Home</Link></li>
                    {crumbs.map(function(crumb){
                        return <li key={key++}><Link to={crumb.to}>{crumb.title}</Link></li>
                    })}
                    <li class="active">{title}</li>
                </ol>
            </section>
        );
    }
}

export default ContentHeader;
