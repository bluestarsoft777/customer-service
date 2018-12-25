import React from 'react'
import { renderRole } from '../common/Authorization'

class ProfileCard extends React.Component {
  render () {
    const { profileData } = this.props
    const role = renderRole(profileData)

    return (
      <div className='box profile-card'>
        <article className='media'>
          <div className='media-left'>
            <figure className='image is-64x64'>
              <img src={profileData.picture} alt='Image' />
            </figure>
          </div>
          <div className='media-content'>
            <div className='content'>
              <p>
                <strong>{profileData.name}</strong>
                <br />
                <div className='profile-card__line'>
                  <strong className='profile-card__label'>ID: </strong>{profileData.sub}
                </div>
                <div className='profile-card__line'>
                  <strong className='profile-card__label'>Email: </strong>{profileData.name}
                </div>
                <div className='profile-card__line'>
                  <strong className='profile-card__label'>Role: </strong>{role}
                </div>
              </p>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

export default ProfileCard
