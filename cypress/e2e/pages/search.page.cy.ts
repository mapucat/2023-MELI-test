/// <reference types="cypress" />

const dimensions: Cypress.ViewportPreset[] = [
  'macbook-16', 'ipad-2'
]

dimensions.forEach((dimension: Cypress.ViewportPreset) => {
  describe(`<SearchPage> dimension: ${dimension}`, () => {
    beforeEach(() => {
      cy.viewport(dimension)
      cy.visit('/')
    })

    it('displays <Header> and <SearchInput> components', () => {
      cy.get('header').should('be.visible')
      cy.get('input[placeholder*="Nunca dejes de buscar"]')
        .should('be.visible')
    })

    it('should redirect to <ItemsPage> when button is clicked', () => {
      cy.intercept('/api/items**', { fixture: 'celular-list' }).as('getItems')

      cy.get('input[placeholder*="Nunca dejes de buscar"]').type("celular")
      cy.get('.ui-input-search button').click()
      cy.url()
        .should('be.equal', 'http://localhost:3000/items?search=celular')

      cy.wait('@getItems').its('request.url').should('include', '/items?q=celular')
    })
  })
})
