import React, {Component} from 'react';
import FormField from './FormField';

export default class StaticField extends Component {
    shouldComponentUpdate(nextProps) {
        return (this.props.label !== nextProps.label ||
        this.props.value !== nextProps.value)
    }

    render() {
        const {label, value, cols} = this.props;
        return <FormField cols={cols} inputClass="form-control-static" label={label}>{value}</FormField>
    }
}
