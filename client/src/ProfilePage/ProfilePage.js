import React from 'react'
import { inject, observer } from 'mobx-react'
import { extendObservable } from 'mobx'
import Loader from '../common/Loader'
import ProfileCard from './ProfileCard';

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
    return (
      <div className='section'>
        <h1 className='title'>
          Your profile
        </h1>

        {this.loading
          ? <Loader />
          : <ProfileCard profileData={this.profileData} />
        }
      </div>
    )
  }
}

export default inject('authStore')(observer(ProfilePage))
