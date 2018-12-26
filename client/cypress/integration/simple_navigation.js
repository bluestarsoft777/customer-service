/// <reference types="Cypress" />

context('Simple navigation', () => {
  before(() => {
    cy.visit('/')
  })

  it('starts on home page', () => {
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('can navigate to about page', () => {
    cy.get('[data-cy="about-link"]').click()
    cy.url().should('eq', 'http://localhost:3000/about')
  })

  it('no profile page while not logged in', () => {
    cy.get('[data-cy="profile-link"]').should('not.exist')
  })

  it('no customers service page while not logged in', () => {
    cy.get('[data-cy="customer-service-link"]').should('not.exist')
  })
})
