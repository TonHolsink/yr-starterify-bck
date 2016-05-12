import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

class CounterStatus extends Component {
    render() {
        const {value} = this.props
        return (
            <b>{value}</b>
        )
    }
}

CounterStatus.propTypes = {
    value: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
    return {
        value: state.counter
    }
}

export default connect(
    mapStateToProps
)(CounterStatus)

