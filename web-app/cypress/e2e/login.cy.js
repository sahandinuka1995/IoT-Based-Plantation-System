describe('Login Page', async () => {
    await it('Login with valid username and invalid password', async () => {
        await cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        await cy.get('#login-username').type('sahan')
        await cy.get('#login-password').type('13234')
        await cy.get('.btn').click()

        await cy.get('.go2072408551').should('be.visible')
        await cy.get('.go2072408551').should('contain', 'invalid password')
    })

    await it('Login with invalid username and valid password', async () => {
        await cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        await cy.get('#login-username').type('sahand')
        await cy.get('#login-password').type('1234')
        await cy.get('.btn').click()

        await cy.get('.go2072408551').should('be.visible')
        await cy.get('.go2072408551').should('contain', 'user not found')
    })

    await it('Login with valid username and password', async () => {
        await cy.visit('https://iot-based-plantation-system-2evs.onrender.com/login')

        await cy.get('#login-username').type('sahan')
        await cy.get('#login-password').type('1234')
        await cy.get('.btn').click()

        await cy.url().should('include', '/home')
        await cy.get('.navbar-container').should('be.visible')
    })
})