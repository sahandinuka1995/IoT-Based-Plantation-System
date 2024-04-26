describe('Login Page', () => {
    it('Login with valid username and password', async () => {
        await cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        cy.get('#login-username').type('sahan')
        cy.get('#login-password').type('1234')
        await cy.get('.btn').click()

        cy.url().should('include', '/home')
        cy.get('.navbar-container').should('be.visible')
    })

    it('Login with invalid username and valid password', async () => {
        await cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        cy.get('#login-username').type('sahand')
        cy.get('#login-password').type('1234')
        await cy.get('.btn').click()

        cy.get('.go2072408551').should('be.visible')
        cy.get('.go2072408551').should('contain', 'user not found')
    })

    it('Login with valid username and invalid password', async () => {
        await cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        cy.get('#login-username').type('sahan')
        cy.get('#login-password').type('13234')
        await cy.get('.btn').click()

        cy.get('.go2072408551').should('be.visible')
        cy.get('.go2072408551').should('contain', 'invalid password')
    })
})