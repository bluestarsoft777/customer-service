/// <reference types="Cypress" />

context('Authenticated Sales representative navigation', () => {
  before(() => {
    cy.visit('/')
    cy.loginAsSalesRepresentative()
  })

  it('test profile link', () => {
    cy
      .get('[data-cy="profile-link"]') // This link should only be visible to logged in users
      .click()
      .url()
      .should('contain', '/profile')
  })

  it('test customer service link', () => {
    cy
      .get('[data-cy="customer-service-link"]') // This link should only be visible to sales representatives
      .click()
      .url()
      .should('contain', '/customer-service')
  })
})
