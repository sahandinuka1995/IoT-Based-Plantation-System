describe('Plant Finder Page', async () => {
    await it('Login', () => {
        cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        cy.get('#login-username').type('sahan')
        cy.get('#login-password').type('1234')
        cy.get('.btn').click()

        cy.url().should('include', '/home')
        cy.get('.navbar-container').should('be.visible')
    })
})

describe('Prediction', async () => {
    await it('Prediction', async () => {
        cy.visit('https://iot-based-plantation-system-2evs.onrender.com/plant-finder')

        await cy.get('.btn-circle').click()
        await cy.get('.border').should('be.visible')
    })
})