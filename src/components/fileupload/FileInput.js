'use strict';

import React, {Component, PropTypes} from 'react'

export default class FileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            styles: {
                file: {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    margin: 0,
                    opacity: 0,
                    fontSize: '200px', //!important
                    cursor: 'pointer'
                },
                button: {
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'inline-block'
                }
            },
            key: ''
        };
    }

    handleChange(e) {
        const v = e.target.value;
        this.setState({
            value: v.split(/(\\|\/)/g).pop()
        });
        //If the file selection is canceled, v is an empty string
        if (this.props.onChange && v) {
            this.props.onChange(e);
        }
    }

    render() {
        return <div>
                <span className="btn btn-success" style={this.state.styles.button}
                      disabled={this.props.disabled}
                >
                    <i className="glyphicon glyphicon-plus"></i>
                    <span>Select files...</span>
                    <input
                        type="file"
                        name={this.props.name}
                        className={this.props.className}
                        onChange={this.handleChange.bind(this)}
                        disabled={this.props.disabled}
                        style={this.state.styles.file}
                        key={this.props.uniqKey}
                    />
                </span>
        </div>
    }
}
