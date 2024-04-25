describe('template spec', () => {
  it('Login', () => {
    cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

    cy.get('#login-username').type('sahan')
    cy.get('#login-password').type('1234')
    cy.get('.btn').click()

    cy.url().should('include', '/home')
    cy.get('.navbar-container').should('be.visible')
  })

  it('passes', () => {
    cy.visit('https://iot-based-plantation-system-2evs.onrender.com/plant-finder')
  })
})