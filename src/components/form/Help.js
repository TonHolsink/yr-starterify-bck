require('./Help.css')

import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import React, { Component, PropTypes } from 'react'
import Tooltip from 'react-bootstrap/lib/Tooltip'

export default class Help extends Component {
  render() {
    const tooltip = <Tooltip id={'tooltip_help'}>{this.props.text}</Tooltip>
    return <OverlayTrigger overlay={tooltip} delayShow={300} delayHide={150}>
      <Glyphicon className="Help" glyph="question-sign"/>
    </OverlayTrigger>
  }

}

Help.propTypes = {
    text: PropTypes.string.isRequired
}
