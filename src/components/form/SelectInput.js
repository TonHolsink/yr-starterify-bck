import React, {Component, PropTypes} from 'react';
import FormField from './FormField';

export default class SelectInput extends Component {
    shouldComponentUpdate = FormField.shouldFormFieldUpdate;

    static propTypes = {
        field: PropTypes.object.isRequired,
        headerKey: PropTypes.string,
        headerValue: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
            value: PropTypes.string
        }))
    };

    render() {
        const {field, afterChange, help, label, list, cols, headerKey, headerValue, ...inputProps} = this.props;
        const hk = headerKey || '';
        const hv = headerValue || 'Maak uw keuze\u2026';

        let onChange = field.onChange;
        if (afterChange) {
            onChange = function (...args) {
                field.onChange(...args);
                afterChange(...args)
            }
        }

        return <FormField field={field} help={help} cols={cols} inputProps={inputProps} label={label}>
            <select
                {...inputProps}
                className="form-control"
                name={field.name}
                onBlur={field.onBlur}
                onChange={onChange}
                value={field.value}
            >
                <option value={hk}>{hv}</option>
                {
                    list.map((opt, index) => {
                        return <option key={index} value={opt.key}>{opt.value}</option>;
                    })
                }
            </select>
        </FormField>
    }
}
