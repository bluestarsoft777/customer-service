// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const auth0 = require('auth0-js')

Cypress.Commands.add('loginAsSalesRepresentative', () => {
  return loginAsUser({
    email: Cypress.env('auth0SalesRepresentativeEmail'),
    password: Cypress.env('auth0SalesRepresentativePassword')
  })
})

Cypress.Commands.add('loginAsBasicUser', () => {
  return loginAsUser({
    email: Cypress.env('auth0BasicUserEmail'),
    password: Cypress.env('auth0BasicUserPassword')
  })
})

function loginAsUser ({ email, password }) {
  const emailInput = '.auth0-lock-input[type="email"]'
  const passwordInput = '.auth0-lock-input[type="password"]'
  const submitButton = '.auth0-lock-submit'

  cy.window().then((win) => {
    win.__authStore__.logout()

    cy.visit('/')

    cy.get('[data-cy^="log"][data-cy$="-button"]')
      .then($loginButton => {
        if ($loginButton.attr('data-cy') === 'logout-button') {
          $loginButton.click()
        }
      })

    cy.get('[data-cy="login-button"]').click()

    cy.get(emailInput).type(email)
    cy.get(passwordInput).type(password)

    cy.get(submitButton).click()
  })
}

// Code taken (and edited) from:
//   https://blog.johnnyreilly.com/2018/07/cypress-and-auth0.html
//
// it returns most of the needed data from Auth0 but for some reason it seems not to set cookies
Cypress.Commands.add('loginAsAdmin2', loginAsAdminFn)

function loginAsAdminFn (overrides = {}) {
  Cypress.log({
    name: 'loginAsAdminBySingleSignOn'
  })

  const auth0Instance = new auth0.WebAuth({
    domain: Cypress.env('auth0Domain'), // Get this from https://manage.auth0.com/#/applications and your application
    clientID: Cypress.env('auth0ClientId'), // Get this from https://manage.auth0.com/#/applications and your application
    redirectUri: Cypress.env('auth0RedirectUri'),
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  cy.window().then((win) => {
    const authStore = win.__authStore__

    // owerwrite auth instance
    authStore.auth0 = auth0Instance

    auth0Instance.client.login(
      {
        realm: 'Username-Password-Authentication',
        username: Cypress.env('auth0AdminEmail'),
        password: Cypress.env('auth0AdminPassword'),
        // audience: Cypress.env(''), // Get this from https://manage.auth0.com/#/apis and your api, use the identifier property
        responseType: 'token id_token',
        scope: 'openid profile'
      },
      function (err, authResult) {
        // Auth tokens in the result or an error
        if (authResult && authResult.accessToken && authResult.idToken) {
          authStore.renewSession()
          return authResult
        } else {
          throw err
        }

        // const token = {
        //   accessToken: authResult.accessToken,
        //   idToken: authResult.idToken,
        //   // Set the time that the access token will expire at
        //   expiresAt: authResult.expiresIn * 1000 + new Date().getTime()
        // }

        // // window.sessionStorage.setItem('auth0Token', JSON.stringify(token))
        // // window.sessionStorage.setItem('auth0Token', JSON.stringify(token))

        // window.localStorage.setItem('auth0Token', JSON.stringify(token))
        // window.localStorage.setItem('isLoggedIn', 'true')

        // // window.authStore.renewSession()
        // resolve(token)
      })
  })
}
