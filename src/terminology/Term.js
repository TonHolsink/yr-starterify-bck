import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import msg from './messages.js'


class Term extends Component {
    render() {
        const DEFAULT = 'default';
        const {mkey} = this.props;
        let subscriber = DEFAULT;
        try {
            subscriber = this.context.store.getState().authState.user.subscriber || DEFAULT;
        } catch(e) { }
        return <span>{msg(mkey, subscriber)}</span>
    }
}

Term.contextTypes = {
    store: React.PropTypes.object.isRequired
};

Term.propTypes = {
    mkey: PropTypes.string.isRequired
};

export default connect()(Term)
