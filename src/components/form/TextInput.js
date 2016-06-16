import React, {Component, PropTypes} from 'react';
import FormField from './FormField';

export default class TextInput extends Component {
    shouldComponentUpdate = FormField.shouldFormFieldUpdate;

    static propTypes = {
        field: PropTypes.object.isRequired
    };

    render() {
        const {field, help, label, cols, ...inputProps} = this.props;

        return <FormField field={field} help={help} cols={cols} inputProps={inputProps} label={label}>
            <input
                {...inputProps}
                className="form-control"
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                value={field.value}
            />
        </FormField>
    }
}

