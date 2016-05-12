import React, { Component, PropTypes } from 'react'
import FormField from './FormField'
import NumberPicker from 'react-widgets/lib/NumberPicker'
import numberLocalizer from 'react-widgets/lib/localizers/simple-number'

numberLocalizer();

export default class NumberInput extends Component {
	shouldComponentUpdate = FormField.shouldFormFieldUpdate;
  render() {
    const {field, help, label, cols, ...inputProps} = this.props

    return <FormField field={field} help={help} cols={cols} inputProps={inputProps} label={label}>
    	<NumberPicker
	        {...inputProps}
	        name={field.name}
	        onChange={field.onChange}
 			value={field.value ? field.value : null}
 			format='#'
     	/>
    </FormField>
  }
}

NumberInput.propTypes = {
    field: PropTypes.object.isRequired
}
