describe('User Management Page', async () => {
    await it('Login', () => {
        cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        cy.get('#login-username').type('sahan')
        cy.get('#login-password').type('1234')
        cy.get('.btn').click()

        cy.url().should('include', '/home')
        cy.get('.navbar-container').should('be.visible')
    })
})

describe('Users Page', async () => {
    await it('Prediction', async () => {
        cy.visit('https://iot-based-plantation-system-2evs.onrender.com/users')

        await cy.get('.sc-fzoNJl').should('be.visible')
    })
})