import React, { Component } from 'react';
import { Link } from 'react-router';
import Image from './Image';

import DefaultAvatar from '../images/default-avatar.png';

class UserAvatar extends Component {

    static defaultProps = {
        imageId: null,
        width: 160,
        className: 'img-circle',
        alt: 'Gebruikers foto'
    };

    render() {

        const { imageId, width, alt, className, ...props } = this.props;

        return (
            <Image className={className} imageId={imageId} placeholderSrc={DefaultAvatar} width={width} alt={alt} {...props}/>
        );
    }
}

export default UserAvatar;
