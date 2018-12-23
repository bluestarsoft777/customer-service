import React from 'react'
import CustomerStore from './customer-store'
import { observer } from 'mobx-react'
import Loader from '../../common/Loader'
import CustomerTable from './CustomerTable'
import Pagination from '../../common/Pagination/Pagination'
import CustomerSearchForm from './CustomerSearchForm'

class CustomerServicePage extends React.Component {
  constructor (props) {
    super(props)
    this.customerStore = new CustomerStore()
  }
  componentDidMount () {
    this.customerStore.filterCustomers()
  }

  changePage = newPage => {
    this.customerStore.filters.page = newPage
    this.customerStore.filterCustomers()
  }

  handleSearch = filters => {
    this.customerStore.filters.page = 1
    this.customerStore.filterCustomers()
  }

  render () {
    let content
    if (this.customerStore.loading) {
      content = <Loader />
    } else {
      content = (
        <React.Fragment>
          <CustomerTable customers={this.customerStore.customers} />
          <Pagination currentPage={this.customerStore.filters.page} pageCount={this.customerStore.pageCount} onPageClick={this.changePage} />
        </React.Fragment>
      )
    }

    return (
      <div className='section'>
        <h1 className='title'>Customers</h1>
        <div className='columns'>
          <div className='column is-one-fifth'>
            <CustomerSearchForm customerStore={this.customerStore} onSearch={this.handleSearch} />
          </div>
          <div className='column is-four-fifths'>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

export default observer(CustomerServicePage)
