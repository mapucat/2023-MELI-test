/// <reference types="cypress" />

const dimensions: Cypress.ViewportPreset[] = [
  'macbook-16', 'ipad-2'
]

dimensions.forEach((dimension: Cypress.ViewportPreset) => {
  describe(`<ItemsPage> dimension: ${dimension}`, () => {
    beforeEach(() => {
      cy.viewport(dimension)
      cy.visit('/items?search=celular')
      cy.intercept('/api/items**', { fixture: 'celular-list' }).as('getItems')
    })

    it('displays <Header>, <SearchInput> and <PreviewItem> components', () => {
      // Basic items
      cy.get('header').should('be.visible')
      cy.get('input[placeholder*="Nunca dejes de buscar"]')
        .should('be.visible')
      // Should request item list
      cy.wait('@getItems').its('request.url').should('include', '/items?q=celular')
      // Should render 4 items
      cy.get('.items-page__list > article').should('have.length', 4)
    })

    it('should reload page when button is clicked', () => {
      cy.get('input[placeholder*="Nunca dejes de buscar"]').type("tablet")
      cy.intercept('/api/items**', { fixture: 'tablet-list' }).as('getTablets')
      // Perform event
      cy.get('.ui-input-search button').click()
      // url should change after event
      cy.url()
        .should('be.equal', 'http://localhost:3000/items?search=tablet')
      cy.wait('@getTablets').its('request.url').should('include', '/items?q=tablet')
      // Should render 4 items
      cy.get('.items-page__list > article').should('have.length', 4)
    })

    const itemIdsAsserts = ['MLA1184760504', 'MLA1300492340', 'MLA1128679881', 'MLA1266352786']

    itemIdsAsserts.forEach((itemId: string, index: number) => {
      it('should redirect to <ItemDetailPage> when element is clicked', () => {
        cy.intercept('/api/items/*', { fixture: 'celular-MLA1184760504' }).as('getCelular')
        // Perform event
        cy.get('.items-page__list > article').eq(index).click()
        // url should redirect after event
        cy.url()
          .should('be.equal', `http://localhost:3000/items/${itemId}`)
        cy.wait('@getCelular').its('request.url').should('include', `/items/${itemId}`)
      })
    })
  })
})
