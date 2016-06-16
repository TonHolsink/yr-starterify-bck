import React, {Component, PropTypes} from 'react'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import FormField from './FormField'

export default class DateInput extends Component {
    shouldComponentUpdate = FormField.shouldFormFieldUpdate;

    static propTypes = {
        field: PropTypes.object.isRequired
    };

    render() {
        const {field, help, label, afterChange, cols, ...inputProps} = this.props;
        let onChange = field.onChange;
        if (afterChange) {
            onChange = function (...args) {
                field.onChange(...args);
                afterChange(...args)
            }
        }
        return <FormField field={field} help={help} cols={cols} inputProps={inputProps} label={label}>
            <DateTimePicker
                {...inputProps}
                format="DD/MM/YYYY"
                name={field.name}
                onChange={onChange}
                time={false}
                value={field.value ? field.value : null}
            />
        </FormField>
    }

}
