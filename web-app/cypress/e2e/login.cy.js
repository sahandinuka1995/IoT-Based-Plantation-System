describe('Login Page', () => {
    it('Login with valid username and invalid password', () => {
        cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        cy.get('#login-username').type('sahan')
        cy.get('#login-password').type('13234')
        cy.get('.btn').click()

        cy.get('.go2072408551').should('be.visible')
        cy.get('.go2072408551').should('contain', 'invalid password')
    })

    it('Login with invalid username and valid password', () => {
        cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        cy.get('#login-username').type('sahand')
        cy.get('#login-password').type('1234')
        cy.get('.btn').click()

        cy.get('.go2072408551').should('be.visible')
        cy.get('.go2072408551').should('contain', 'user not found')
    })

    it('Login with valid username and password', () => {
        cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        cy.get('#login-username').type('sahan')
        cy.get('#login-password').type('1234')
        cy.get('.btn').click()

        cy.url().should('include', '/home')
        cy.get('.navbar-container').should('be.visible')
    })
})

Cypress.on('uncaught:exception', (err, runnable) => {
    console.error('Error captured: ', err)
    return false
})