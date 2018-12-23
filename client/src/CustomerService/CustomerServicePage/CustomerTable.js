import React, { Component } from 'react'
import { observer } from 'mobx-react'
import format from 'date-fns/format'
import { withRouter } from 'react-router-dom'

class CustomerTable extends Component {
  redirectToCustomer = (customerId) => {
    const { history } = this.props
    history.push(`/customer-service/${customerId}`)
  }

  render () {
    const { customers } = this.props

    return (
      <table className='table is-hoverable is-fullwidth'>
        <thead>
          <tr>
            <th>{/* keep empty */}</th>
            <th>
              Email
            </th>
            <th>
              First name
            </th>
            <th>
              Last name
            </th>
            <th>
              Joined on
            </th>
            <th>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr
              key={c.id}
              className='customer-table-row'
              onClick={e => this.redirectToCustomer(c.id)}
            >
              <td>{c.isHot && '🔥'}</td>
              <td>{c.email}</td>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{format(c.joinedOn, 'MMM, DD YYYY')}</td>
              <td>{c.isHot ? '🔥 Hot' : 'Normal'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default withRouter(observer(CustomerTable))
