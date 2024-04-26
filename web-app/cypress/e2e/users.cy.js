describe('User Management Page', async () => {
    await it('Login', () => {
        cy.visit('http://localhost:3000/login')

        cy.get('#login-username').type('sahan')
        cy.get('#login-password').type('1234')
        cy.get('.btn').click()

        cy.url().should('include', '/home')
        cy.get('.navbar-container').should('be.visible')
    })
})

describe('View All Users', async () => {
    await it('View All Users', async () => {
        cy.visit('http://localhost:3000/users')

        await cy.get('.sc-fzoNJl').should('be.visible')
    })
})

describe('Update User', async () => {
    await it('Update User', async () => {
        await cy.visit('http://localhost:3000/users')

        await cy.get('#btn-update-2').click()

        cy.get(':nth-child(2) > .form-group > .form-control').clear()
        cy.get(':nth-child(2) > .form-group > .form-control').type('updateuser')
        cy.get('.modal-footer > .btn-primary').click()

        await cy.get('.go3958317564').should('be.visible')
        await cy.get('.go3958317564').should('contain', 'Operation Successfully')
    })
})

describe('Add New User', async () => {
    await it('Add New User', async () => {
        cy.visit('http://localhost:3000/users')

        cy.get('[align="right"] > .btn').click()

        await cy.get('.col-md-12 > .form-group > .form-control').type('Sample User')
        await cy.get(':nth-child(2) > .form-group > .form-control').type('sample')
        await cy.get('.select__value-container').type('User')
        await cy.get('#react-select-2-option-1').click()
        await cy.get(':nth-child(4) > .form-group > .form-control').type('1234')
        await cy.get(':nth-child(5) > .form-group > .form-control').type('1234')
        await cy.get('.modal-footer > .btn-primary').click()

        await cy.get('.go2072408551').should('be.visible')
        await cy.get('.go2072408551').should('contain', 'Operation Successfully')
    })
})