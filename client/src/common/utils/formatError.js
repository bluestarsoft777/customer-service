export default function formatError (error) {
  if (typeof error === 'string') {
    return error
  }

  if (error.code === 'FORBIDDEN') {
    return `You don't have permissions to execute that action`
  }

  if (error.errors && error.errors.length) {
    return error.errors[0]
  }

  if (error.errors && Object.keys(error.errors).length) {
    const errorKey = Object.keys(error.errors)[0]
    const formattedKey = errorKey[0].toUpperCase() + errorKey.slice(1)
    const errorKeyErrors = error.errors[errorKey]
    return `${formattedKey} ${errorKeyErrors[0]}`
  }

  return 'An error occured, please try again.'
}
