import React, { Component, PropTypes } from 'react'
import FormField from './FormField'

export default class SelectInput extends Component {
	shouldComponentUpdate = FormField.shouldFormFieldUpdate;
  render() {
    const {field, help, label, list, cols, ...inputProps} = this.props
    return <FormField field={field} help={help} cols={cols} inputProps={inputProps} label={label}>
      <select
        {...inputProps}
        className="form-control"
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value}
      >
      	<option value=''>Maak uw keuze...</option>
      	{
      		list.map(opt => {
      			return <option key={opt.key} value={opt.key}>{opt.value}</option>;
      		})
      	}
      </select>
    </FormField>
  }
}

SelectInput.propTypes = {
    field: PropTypes.object.isRequired
}
