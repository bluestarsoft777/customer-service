import React from 'react'
import { observer } from 'mobx-react'
import SingleCustomerStore from './single-customer-store'
import Loader from '../../common/Loader'
import { withRouter } from 'react-router-dom'
// import CustomerStore from './customer-store'
// import CustomerTable from './CustomerTable'
// import Pagination from '../../common/Pagination/Pagination'
// import CustomerSearchForm from './CustomerSearchForm'

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

      content = (
        <React.Fragment>
          <div>
            First name: {customerData.firstName}
          </div>
          <div>
            Last name: {customerData.lastName}
          </div>
          <div>
            Email: {customerData.email}
          </div>
          <div>
            Status: {customerData.isHot ? '🔥 Hot' : 'Normal'}
          </div>
        </React.Fragment>
      )
    }

    return (
      <div className='section'>
        <h1 className='title'>Customer page 1</h1>
        <div>
          {content}
        </div>
      </div>
    )
  }
}

export default withRouter(observer(CustomerPage))
