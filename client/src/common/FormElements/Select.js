import React from 'react'
import Select from 'react-select'

class SelectComponent extends React.Component {
  getOptionLabel (option) {
    return option.name
  }

  getOptionValue (option) {
    return option.id
  }

  render () {
    const { options, ...restProps } = this.props

    return (
      <Select
        getOptionLabel={this.getOptionLabel}
        getOptionValue={this.getOptionValue}
        options={options}
        {...restProps}
      />
    )
  }
}

export default SelectComponent
