/// <reference types="Cypress" />

context('Authenticated Basic user navigation', () => {
  before(() => {
    cy.visit('/')
    cy.loginAsBasicUser()
  })

  it('profile link is visible for basic users', () => {
    cy
      .get('[data-cy="profile-link"]')
      .click()
      .url()
      .should('contain', '/profile')
  })

  it(`customer service link isn't visible for basic users`, () => {
    cy.get('[data-cy="customer-service"]').should('not.exist')
  })
})
