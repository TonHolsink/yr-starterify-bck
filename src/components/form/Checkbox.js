import React, {Component, PropTypes} from 'react';
import FormField from './FormField';

export default class Checkbox extends Component {
    shouldComponentUpdate = FormField.shouldFormFieldUpdate;

    static propTypes = {
        field: PropTypes.object.isRequired
    };

    render() {
        const {field, help, label, cols, ...inputProps} = this.props;

        return <FormField field={field} help={help} cols={cols} inputProps={inputProps} label={label}>
            <input style={{marginTop: '10px'}}
                {...inputProps}
                type="checkbox"
                name={field.name}
                checked={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                value={field.value}
            />
        </FormField>
    }
}

