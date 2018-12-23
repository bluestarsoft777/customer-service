import React from 'react'
import { Field, ErrorMessage } from 'formik'

class FormField extends React.Component {
  render () {
    const { label, name, small = false, type = 'text', component, ...props } = this.props
    let classes = component ? '' : 'input'
    if (small) classes += ' is-small'

    return (
      <div className='field'>
        <label className='label'>
          {label}
        </label>
        <div className='control'>
          <Field
            name={name}
            className={classes}
            component={component}
            type={type}
            {...props}
          />
        </div>
        <ErrorMessage name={name} render={FieldError} />
      </div>
    )
  }
}

const FieldError = (msg) => {
  return <p className='help is-danger'>{msg}</p>
}

export default FormField
