/// <reference types="cypress" />

const dimensions: Cypress.ViewportPreset[] = [
  'macbook-16', 'ipad-2', 'iphone-x', 'iphone-4'
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

    it('should redirect to <ItemsPage>  onSubmit', () => {
      cy.get('input[placeholder*="Nunca dejes de buscar"]').type("Celular")

      cy.get('form').submit()

      // Redirect
    })
  })
})
