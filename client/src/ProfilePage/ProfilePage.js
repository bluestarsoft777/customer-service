import React from 'react'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import Loader from '../common/Loader'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    extendObservable(this, {
      loading: true,
      error: null,
      profileData: null
    })
  }

  async componentDidMount () {
    try {
      this.loading = true
      const profileData = await this.props.authStore.getProfile()
      this.profileData = profileData
      this.loading = false
    } catch (error) {
      this.error = error
      this.loading = false
    }
  }

  render () {
    let content

    if (this.loading) {
      content = <Loader />
    } else {
      const roles = 'https://customer-service.com/roles'
      const role = this.profileData[roles]
      content = (
        <div>
          Display info here
          <div>ID: {this.profileData.sub}</div>
          <div>Email: {this.profileData.name}</div>
          <div>Role: {role}</div>
          <img src={this.profileData.picture} alt={`${this.profileData.name} photo`} />
          <pre>
            {JSON.stringify(this.profileData, null, 2)}
          </pre>
        </div>
      )
    }

    return (
      <div className='section'>
        <h1 className='title'>
          Your profile
        </h1>

        {content}
      </div>
    )
  }
}

export default inject('authStore')(observer(ProfilePage))
