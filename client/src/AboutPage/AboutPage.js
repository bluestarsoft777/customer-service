import React from 'react'
import { LoginOutButton, NotLoggedInAuthorization, LoggedInAuthorization } from '../common/Authorization'
import { Link } from 'react-router-dom'

class AboutPage extends React.Component {
  render () {
    return (
      <div className='section'>
        <h1 className='title'>About</h1>
        <p>
          This is a simple app with <strong>Auth0 authentication.</strong>
        </p>

        <NotLoggedInAuthorization>
          <p>
            Some of the pages are visible after you<br />
            <LoginOutButton className='hero-buttons' />
          </p>
        </NotLoggedInAuthorization>

        <LoggedInAuthorization>
          <p>
            <strong>Great!</strong> You are logged in. Check your <Link to='/profile'>profile!</Link>
          </p>
        </LoggedInAuthorization>
      </div>
    )
  }
}

export default AboutPage
