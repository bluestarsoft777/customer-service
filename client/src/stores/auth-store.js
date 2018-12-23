import api from '../api/api'
import { extendObservable } from 'mobx'
import auth0 from 'auth0-js'

// import tokenStorage from '../utils/tokenStorage'

class AuthStore {
  constructor () {
    const auth0Instance = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH_DOMAIN,
      clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
      responseType: 'token id_token',
      scope: 'openid'
    })

    extendObservable(this, {
      auth0: auth0Instance,
      accessToken: null,
      idToken: null,
      idTokenPayload: null,
      expiresAt: 0,
      loading: true,

      // error: null,
      // user: null,

      get isLoggedIn () {
        return new Date().getTime() < this.expiresAt
      },

      get isSalesRepresentative () {
        if (!this.idTokenPayload) return false
        const userRoles = this.idTokenPayload['https://customer-service.com/roles']
        return userRoles.includes('sales-representative')
      }
    })

    if (window.localStorage.getItem('isLoggedIn') === 'true') {
      this.renewSession()
    } else {
      this.loading = false
    }
  }

  login = () => {
    this.auth0.authorize()
  }

  setSession = (authResult) => {
    window.localStorage.setItem('isLoggedIn', 'true')

    let expiresAt = (authResult.expiresIn * 1000) + (new Date().getTime())

    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.idTokenPayload = authResult.idTokenPayload
    this.expiresAt = expiresAt

    api.setToken(this.idToken)
  }

  renewSession = () => {
    this.loading = true
    this.auth0.checkSession({}, (error, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        this.loading = false
      } else if (error) {
        this.logout()
        this.loading = false
        console.error(error)
        // alert(`Could not get new token (${error.error}: ${error.error_description})`)
      }
    })
  }

  handleAuthFromHash = ({ onAuth, onError }) => {
    this.loading = true
    this.auth0.parseHash((error, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        this.loading = false
        onAuth && onAuth()
      } else if (error) {
        // this.logout()
        this.loading = false
        console.error(error)
        onError && onError(error)
        // alert(`Error ${error.error}. Check console for details.`)
      }
    })
  }

  logout = () => {
    // this doesn't redirect properly
    // this.auth0.logout({
    //   returnTo: process.env.REACT_APP_URL,
    //   clientID: process.env.REACT_APP_AUTH_CLIENT_ID
    // })

    this.accessToken = null
    this.idToken = null
    this.idTokenPayload = null
    this.expiresAt = 0

    window.localStorage.removeItem('isLoggedIn')

    api.clearToken()
  }

  // async loadUser () {
  //   const token = tokenStorage.getToken()
  //   if (token) {
  //     try {
  //       this.loading = true
  //       api.setToken(token)
  //       const user = await userApi.load(token)
  //       this.user = user
  //       this.loading = false
  //     } catch (error) {
  //       if (isUnathorizedError(error)) {
  //         this.logoutUser()
  //       }
  //       // else retry?
  //     }
  //   }
  // }

  // setUser (userData, token) {
  //   tokenStorage.saveToken(token)
  //   api.setToken(token)
  //   this.user = userData
  // }

  // logoutUser = () => {
  //   tokenStorage.clearToken()
  //   this.user = null
  //   api.clearToken()

  //   // reload the app, to clear the state
  //   window.location.reload()
  // }
}

export default AuthStore

// function isUnathorizedError (error) {
//   return error.code === 'UNAUTHORIZED'
// }
