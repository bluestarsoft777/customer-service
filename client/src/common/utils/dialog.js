import swal from 'sweetalert2'
import formatError from './formatError'

function showDialog ({
  title,
  text,
  type = 'warning',
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel'
}) {
  return swal({
    title,
    text,
    type,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText
  }).then((result) => result.value)
}

function showAlert ({
  title,
  text,
  type = 'info',
  confirmButtonText = 'Ok'
}) {
  return swal({
    title,
    text,
    type,
    confirmButtonText
  })
}

function showSuccess (title, text) {
  return swal({
    title,
    text,
    type: 'success'
  })
}

function showError (error, title = 'Error') {
  let errorMessage = formatError(error)

  return swal({
    title,
    text: errorMessage,
    type: 'error'
  })
}

export {
  showDialog,
  showAlert,
  showError,
  showSuccess
}
