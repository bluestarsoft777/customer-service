import React from 'react'

export default function formatError (error) {
  if (typeof error === 'string') {
    return error
  }

  if (error.errors && Object.keys(error.errors).length) {
    const errorMessage = Object.keys(error.errors).map(errorKey => {
      const formattedKey = errorKey[0].toUpperCase() + errorKey.slice(1)
      const errorKeyErrors = error.errors[errorKey]
      const message = `${formattedKey} ${errorKeyErrors[0]}`
      return <p key={errorKey}>{message}</p>
    })

    return errorMessage
  }

  return 'An error occured, please try again.'
}
