describe('template spec', async () => {
    await it('Login', async () => {
        await cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        await cy.get('#login-username').type('sahan')
        await cy.get('#login-password').type('1234')
        await cy.get('.btn').click()

        await cy.url().should('include', '/home')
        await cy.get('.navbar-container').should('be.visible')
    })

    await it('Plant Finder', async () => {
        await cy.visit('https://iot-based-plantation-system-2evs.onrender.com/plant-finder')

        await cy.get('.btn-circle').click()
        await cy.get('.border-left-cus > div > .d-block').should('be.visible')
        await cy.get('[align="center"] > .text-primary').should('be.visible')
    })
})