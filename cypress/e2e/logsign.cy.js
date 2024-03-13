describe('Sign up -> Log in -> Check Logged in', () => {
    const info = Math.random().toString();
    beforeEach(() => {
        cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/')
    // Click the menu button to open the sidebar
    cy.get('#menu').click()

    // Click the 'Settings' button in the sidebar
    cy.get('button').contains('Settings').click()
    cy.get('button').contains('Sign Up').click()

    // Fill in the login form
    // Replace 'input[name="username"]' and 'input[name="password"]' with the actual selectors for the username and password fields
    cy.get('input[name="username"]').type(info)
    cy.get('input[name="password"]').type(info)
    cy.get('input[name="phoneNumber"]').type('9495252175')
    cy.get('input[name="email"]').type('jmdebarro@gmail.com')

    // Click the 'Submit' button
    cy.get('input[type="button"]').click()
    cy.wait(1000)

    // Click the menu button to open the sidebar
    cy.get('#menu').click()
    cy.get('button').contains('Settings').click()
    // Log in with credentials you signed up with
    cy.get('button').contains('Log In').click()
    cy.get('input[name="username"]').type(info)
    cy.get('input[name="password"]').type(info)
    cy.get('input[type="button"]').click()
    cy.wait(1000)

    cy.get('#menu').click()
    cy.get('button').contains('My Profile').click()
    })

    it('should sign up and log in', () => {
        // Check that the username is 'nmandke'
        cy.get('#username').should('contain', info)
        cy.get('p').should('contain', 'jmdebarro@gmail.com')
        cy.get('p').should('contain', '9495252175')
    })

})
  