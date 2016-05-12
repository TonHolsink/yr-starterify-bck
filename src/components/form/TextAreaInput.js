import React, { Component, PropTypes } from 'react'
import FormField from './FormField'

export default class TextAreaInput extends Component {
	shouldComponentUpdate = FormField.shouldFormFieldUpdate;
  render() {
    const {field, help, label, cols, ...inputProps} = this.props

    return <FormField field={field} help={help} cols={cols} inputProps={inputProps} label={label}>
      <textarea
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

TextAreaInput.propTypes = {
    field: PropTypes.object.isRequired
}
