import React from 'react'
import Select from 'react-select'
import Async from 'react-select/lib/Async'

class FormSelectField extends React.Component {
  getOptionLabel (option) {
    return option.name
  }

  getOptionValue (option) {
    return option.id
  }

  onOptionChange = (selectedValue) => {
    const {form, field} = this.props
    form.setFieldValue(field.name, selectedValue.id)
  }

  onBlur = () => {
    const {form, field} = this.props
    form.setFieldTouched(field.name, true, true)
  }

  render () {
    const { options, field, async, ...props } = this.props

    const value = !async && options.find(option => option.id === field.value)
    const SelectType = async ? Async : Select

    return (
      <SelectType
        getOptionLabel={this.getOptionLabel}
        getOptionValue={this.getOptionValue}
        options={options}
        value={value}
        onChange={this.onOptionChange}
        onBlur={this.onBlur}
        {...props}
      />
    )
  }
}

export default FormSelectField
