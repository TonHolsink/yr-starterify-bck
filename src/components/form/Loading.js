require('./Loading.css');

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {delaying: !!this.props.delay};
    }

    componentDidMount() {
        if (this.props.delay) {
            this.timeout = setTimeout(this.handleDisplay, this.props.delay)
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
    }

    handleDisplay() {
        this.timeout = null;
        this.setState({delaying: false})
    }

    render() {
        const {delay, inline, text} = this.props;
        const {delaying} = this.state;
        const className = classNames('Loading', {
            'Loading--delaying': delaying,
            'Loading--displaying': delay && !delaying,
            'Loading--inline': inline
        });
        return <div className={className}>
            <Glyphicon glyph="refresh"/>
            {text && <div className="Loading__text">{text}&hellip;</div>}
        </div>
    }
}
