import React from 'react'
import { NotLoggedInAuthorization, SalesRepresentativeAuthorization, BasicAuthorization } from '../common/Authorization'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

class HomePage extends React.Component {
  render () {
    return (
      <div className='section'>
        <h1 className='title'>Home page</h1>

        <NotLoggedInAuthorization>
          <p>
            Please <strong>log in</strong> to reveal the app.
          </p>
        </NotLoggedInAuthorization>

        <SalesRepresentativeAuthorization>
          <p>
            <strong>Great!</strong>{' '}
            You are a sales representative, you can check customers{' '}
            <Link to={'/customer-service'}>here.</Link>
          </p>
          <p>
            You can check your <Link to={'/profile'}>profile</Link>.
          </p>
        </SalesRepresentativeAuthorization>

        <BasicAuthorization>
          <p>
            <strong>Hi!</strong>{' '}
            You're a user with basic settings, you can check your <Link to={'/profile'}>profile</Link>.
          </p>
        </BasicAuthorization>
      </div>
    )
  }
}

export default observer(HomePage)
