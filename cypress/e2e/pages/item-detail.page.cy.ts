/// <reference types="cypress" />

const dimensions: Cypress.ViewportPreset[] = [
  'macbook-16', 'ipad-2'
]

dimensions.forEach((dimension: Cypress.ViewportPreset) => {
  describe(`<ItemDetail> dimension: ${dimension}`, () => {
    beforeEach(() => {
      cy.viewport(dimension)
    })

    it('displays <Header>, <SearchInput> and <PreviewItem> components', () => {
      cy.visit('/items/MLA1184760504')
      cy.intercept('/api/items/*', { fixture: 'celular-MLA1184760504' }).as('getCelular')
      cy.get('header').should('be.visible')
      cy.get('input[placeholder*="Nunca dejes de buscar"]')
        .should('be.visible')
      // Should request item information
      cy.wait('@getCelular').its('request.url').should('include', '/api/items/MLA1184760504')
      // Should have item data
      cy.get('article').should('have.length', 1)
      cy.contains('Quantum Q20 Dual Sim 128 Gb Azul 4 Gb Ram').should('be.visible')
      cy.contains('$ 58,227').should('be.visible')
      cy.contains('Fotografía profesional en tu bolsillo Descubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados. Además, con la cámara frontal con flash preparate para compartir selfies más iluminadas en tus redes sociales. Mayor rendimiento Su memoria RAM de 4 GB permite que tu smartphone funcione de manera fluida y sin demoras al realizar distintas tareas, jugar o navegar. Desbloqueo facial y dactilar Máxima seguridad para que solo vos puedas acceder al equipo. Podrás elegir entre el sensor de huella dactilar para habilitar el teléfono en un toque, o el reconocimiento facial que permite un desbloqueo hasta un 30% más rápido. Batería de duración superior ¡Desenchufate! Con la súper batería de 4000 mAh tendrás energía por mucho más tiempo para jugar, ver series o trabajar sin necesidad de realizar recargas.').should('be.visible')
    })

    it('displays <Header>, <SearchInput> and <PreviewItem> components', () => {
      cy.visit('/items/MLA1119462616')
      cy.intercept('/api/items/*', { fixture: 'tablet-MLA1119462616' }).as('getTablet')
      // Basic items
      cy.get('header').should('be.visible')
      cy.get('input[placeholder*="Nunca dejes de buscar"]')
        .should('be.visible')
      // Should request item information
      cy.wait('@getTablet').its('request.url').should('include', '/api/items/MLA1119462616')
      // Should have item data
      cy.get('article').should('have.length', 1)
      cy.contains('Tablet Samsung Galaxy Tab A A7 Lite Sm-t220 8.7 32gb Plateada Y 3gb De Memoria Ram').should('be.visible')
      cy.contains('$ 53,999').should('be.visible')
      cy.contains('Esta tablet Samsung es la compañera ideal, con capacidad de sobra para cada una de tus actividades. El diseño delgado, compacto y portátil, con facilidad para sostener en una mano, lo convierte en una combinación perfecta de rendimiento y versatilidad. Transferir, sincronizar y acceder a tus dispositivos las veces que quieras ahora es posible. Sus conexiones wi-fi, wi-fi direct, bluetooth, usb-c te permiten potenciar sus funciones al máximo. Gracias a su cámara principal de 8 Mpx y frontal de 2 Mpx, podrás hacer videollamadas o sacarte fotos en cualquier momento y lugar, con una excelente calidad de imagen. Nitidez, brillo y colores vibrantes harán que tus experiencias se reflejen de manera óptima.').should('be.visible')
    })
  })
})
