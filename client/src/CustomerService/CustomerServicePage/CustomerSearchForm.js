import React from 'react'
// import { Formik } from 'formik'
import {
  FormActions
} from '../../common/FormElements'
import Input from '../../common/Input'
import { observer } from 'mobx-react'

class CustomerSearchForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null
    }
  }

  handleSubmit = async (event) => {
    try {
      event.preventDefault()
      this.setState({ error: null })
      // const searchParameters = extractValidSearchParameters(formValues)
      await this.props.onSearch()
      // setSubmitting(false)
    } catch (error) {
      // setSubmitting(false)
      console.error(error)
      this.setState({ error })
    }
  }

  render () {
    const { customerStore } = this.props

    let allFilterClasses = 'button'
    let hotFilterClasses = 'button'
    let normalFilterClasses = 'button'

    if (customerStore.filters.isHot === true) {
      hotFilterClasses += ' is-danger is-selected'
    } else if (customerStore.filters.isHot === false) {
      normalFilterClasses += ' is-info is-selected'
    } else {
      allFilterClasses += ' is-primary is-selected'
    }

    return (
      <form
        className='form'
        onSubmit={this.handleSubmit}>

        <Input
          label='Email'
          name='email'
          type='text'
          value={customerStore.filters.email}
          onChange={e => {
            const newEmail = e.target.value
            customerStore.filters.email = newEmail
          }}
        />

        <Input
          label='First name'
          name='firstName'
          type='text'
          value={customerStore.filters.firstName}
          onChange={e => {
            const newFirstName = e.target.value
            customerStore.filters.firstName = newFirstName
          }}
        />

        <Input
          label='Last name'
          name='lastName'
          type='text'
          value={customerStore.filters.lastName}
          onChange={e => {
            const newLastName = e.target.value
            customerStore.filters.lastName = newLastName
          }}
        />

        <div className='buttons has-addons'>
          <span className={allFilterClasses} onClick={() => customerStore.filters.isHot = null}>All</span>
          <span className={hotFilterClasses} onClick={() => customerStore.filters.isHot = true}>Hot</span>
          <span className={normalFilterClasses} onClick={() => customerStore.filters.isHot = false}>Normal</span>
        </div>

        <FormActions
          isSubmitting={customerStore.loading}
          submitText={'Search'}
          showBackButton={false}
          onClick={customerStore.filterCustomers}
        />
      </form>
    )
  }
}

export default observer(CustomerSearchForm)

// function extractValidSearchParameters (formParameters) {
//   return Object.keys(formParameters).reduce((params, param) => {
//     if (formParameters[param]) params[param] = formParameters[param]
//     return params
//   }, {})
// }
