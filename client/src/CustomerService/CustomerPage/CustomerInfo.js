import React from 'react'

class CustomerInfo extends React.Component {
  render () {
    const { customer } = this.props

    return (
      <React.Fragment>
        <div className='customer-info__line'>
          <strong className='customer-info__label'>First name:</strong> {customer.firstName}
        </div>
        <div className='customer-info__line'>
          <strong className='customer-info__label'>Last name:</strong> {customer.lastName}
        </div>
        <div className='customer-info__line'>
          <strong className='customer-info__label'>Email:</strong> {customer.email}
        </div>
        <div className='customer-info__line'>
          <strong className='customer-info__label'>Status:</strong> {customer.isHot ? '🔥 Hot' : 'Normal'}
        </div>
      </React.Fragment>
    )
  }
}

export default CustomerInfo
