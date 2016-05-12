import React, { Component } from 'react';
import { Link } from 'react-router';

import DefaultAvatar from '../images/default-avatar.png';

class UserAvatar extends Component {

    static defaultProps = {
        imageId: null,
        width: 160,
        style: {},
        className: 'img-circle'
    };

    render() {
        return (
            <img {...{ style: this.props.style }} src={this.props.imageId ?
                        'http://demo.q-more.nl/services/files.filesJSON.getDisplayImage?id=' + this.props.imageId + '&w=' + this.props.width : DefaultAvatar} className={this.props.className} alt="Gebruikers foto" />
        );
    }
}

export default UserAvatar;
