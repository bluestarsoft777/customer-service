import React from 'react'
import { Link } from 'react-router-dom'

class FormActions extends React.Component {
  render () {
    const { isSubmitting, submitText = 'Submit', showBackButton = true, backText = 'Cancel', backLink = '/' } = this.props

    const submitButtonClasses = isSubmitting ? 'button is-link is-loading' : 'button is-link'

    const doShowBackButton = showBackButton && !isSubmitting
    const backButton = doShowBackButton && (
      <div className='control'>
        <Link className='button is-text' to={backLink}>{backText}</Link>
      </div>
    )

    return (
      <div className='field is-grouped m-t-2'>
        <div className='control'>
          <button
            className={submitButtonClasses}
            type='submit'
            disabled={isSubmitting}>
            {submitText}
          </button>
        </div>
        {backButton}
      </div>
    )
  }
}

export default FormActions
