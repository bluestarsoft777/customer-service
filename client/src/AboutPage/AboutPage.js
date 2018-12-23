import React from 'react'

class AboutPage extends React.Component {
  render () {
    return (
      <div className='section'>
        <h1 className='title'>About</h1>
        <p>
          This is a simple app with authentication.
        </p>
        <p>
          One page is hidden behind authentication.
        </p>
      </div>
    )
  }
}

export default AboutPage
