import React, { Component } from 'react';

class Image extends Component {
    render() {
        const { imageId, placeholderSrc, width, ...props } = this.props;
        const image = imageId ?
                        window.backendURL + 'files.filesJSON.getDisplayImage?' + (width ? 'w=' + width + '&' : '') + 'id=' + imageId :
                        placeholderSrc;
        return (
            <img src={image} {...props}/>
        );
    }
}

export default Image;
