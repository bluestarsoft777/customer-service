import React from 'react'
import formatReactError from '../utils/formatReactError'

const FormError = ({ error }) => {
  if (!error) return null

  let errorMessage = formatReactError(error)

  return (
    <div className='notification is-danger'>
      {errorMessage}
    </div>
  )
}

export default FormError
