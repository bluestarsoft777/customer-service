import React from 'react'

class Input extends React.Component {
  render () {
    const { label, name, type = 'text', ...props } = this.props

    return (
      <div className='field'>
        <label className='label'>
          {label}
        </label>
        <div className='control'>
          <input
            name={name}
            className='input'
            type={type}
            {...props}
          />
        </div>
      </div>
    )
  }
}

export default Input
