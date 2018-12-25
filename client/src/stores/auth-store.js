import api from '../api/api'
import { extendObservable } from 'mobx'
import auth0 from 'auth0-js'
import { isSalesRepresentative, isBasic, isUserLoginSaved, saveUserLogin, clearUserLogin } from '../common/Authorization/authorizationHelpers'

class AuthStore {
  constructor () {
    const auth0Instance = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH_DOMAIN,
      clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
      responseType: 'token id_token',
      scope: 'openid profile'
    })

    extendObservable(this, {
      auth0: auth0Instance,
      accessToken: null,
      idToken: null,
      idTokenPayload: null,
      expiresAt: 0,
      loading: true,

      get isLoggedIn () {
        return new Date().getTime() < this.expiresAt
      },

      get isSalesRepresentative () {
        if (!this.idTokenPayload) return false
        return isSalesRepresentative(this.idTokenPayload)
      },

      get isBasicUser () {
        if (!this.idTokenPayload) return false
        return isBasic(this.idTokenPayload)
      }
    })

    if (isUserLoginSaved()) {
      this.renewSession()
    } else {
      this.loading = false
    }
  }

  login = () => {
    this.auth0.authorize()
  }

  setSession = (authResult) => {
    saveUserLogin()

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
        this.loading = false
        console.error(error)
        onError && onError(error)
        // alert(`Error ${error.error}. Check console for details.`)
      }
    })
  }

  getProfile = async () => {
    if (!this.accessToken) throw Error('User not logged in')

    return new Promise((resolve, reject) => {
      this.auth0.client.userInfo(this.accessToken, (error, profile) => {
        if (error) {
          reject(error)
        } else {
          resolve(profile)
        }
      })
    })
  }

  logout = () => {
    this.accessToken = null
    this.idToken = null
    this.idTokenPayload = null
    this.expiresAt = 0

    clearUserLogin()
    window.location = '/'

    api.clearToken()
  }
}

export default AuthStore
