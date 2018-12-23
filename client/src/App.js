import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import HomePage from './Home'
import ProfilePage from './ProfilePage'
import AboutPage from './AboutPage'
import AuthCallback from './AuthCallback'
import NotFoundPage from './NotFoundPage'
import Header from './common/Header'
import AuthStore from './stores/auth-store'
import { CustomerServicePage, CustomerPage } from './CustomerService'
import Loader from './common/Loader'
import 'bulma/css/bulma.css'
import './App.css'

const authStore = new AuthStore()

class App extends Component {
  render () {
    return (
      <div>
        <Router>
          <Provider authStore={authStore}>
            {authStore.loading
              ? <Loader />
              : <AppRoutes />}
          </Provider>
        </Router>
      </div>
    )
  }
}

const AppRoutes = () => {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/customer-service' component={CustomerServicePage} />
        <Route exact path='/customer-service/:customerId' component={CustomerPage} />
        <Route exact path='/callback' component={AuthCallback} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/about' component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )
}

// <nav>
//   <ul>
//     <li>
//       <button
//         onClick={e => this.goTo('home')}
//         >
//         Go to home
//       </button>
//     </li>
//     <li>
//     {
//       userAuthenticated
//         ? this.renderLogoutButton()
//         : this.renderLoginButton()
//     }
//     </li>
//   </ul>
// </nav>

// const auth = new Auth()
// auth.login()

// class App extends Component {
//   render () {
//     return (
//       <div className='App'>
//         <header className='App-header'>
//           <img src={logo} className='App-logo' alt='logo' />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className='App-link'
//             href='https://reactjs.org'
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     )
//   }
// }

export default observer(App)
