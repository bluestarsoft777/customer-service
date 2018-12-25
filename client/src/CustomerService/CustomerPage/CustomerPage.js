import React from 'react'
import { observer } from 'mobx-react'
import SingleCustomerStore from './single-customer-store'
import Loader from '../../common/Loader'
import { withRouter, Link } from 'react-router-dom'
import CustomerInfo from './CustomerInfo'

class CustomerPage extends React.Component {
  constructor (props) {
    super(props)
    this.singleCustomerStore = new SingleCustomerStore()
    const customerId = parseInt(props.match.params.customerId, 10)
    this.singleCustomerStore.loadCustomer(customerId)
  }

  render () {
    let content
    if (this.singleCustomerStore.loading) {
      content = <Loader />
    } else {
      const { customerData } = this.singleCustomerStore
      content = <CustomerInfo customer={customerData} />
    }

    return (
      <div className='section'>
        <h1 className='title'>Customer page</h1>
        <div>
          {content}
          <Link to='/customer-service' className='button is-link mt2'>Back to list</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(observer(CustomerPage))
