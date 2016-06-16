import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';

import styles from './Loading.scss';

@CSSModules(styles)
export default class Loading extends Component {


    static propTypes = {
        text: PropTypes.string
    };

    static defaultProps = {
        text: 'Loading...'
    };

    render() {
        const {text} = this.props;
        return (
            <div styleName='loading'>{text}</div>
        )
    }

}
