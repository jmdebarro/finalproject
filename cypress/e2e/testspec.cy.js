import 'cypress-file-upload';

describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/') // replace with your app's URL
  })

  it('should render the Navbar', () => {
    cy.get('nav').should('exist') // replace 'nav' with a selector that selects your Navbar
  })
})

describe('Search', () => {
  beforeEach(() => {
    cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/') // replace with your app's URL
  })

  it('should render the Search', () => {
    cy.get('#Search').should('exist') // replace 'nav' with a selector that selects your Navbar
  })
})

describe('Navigate to Post', () => {
  beforeEach(() => {
    cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/') // replace with your app's URL
  })

  it('should navigate to the post page when the Post Item button is clicked', () => {
    cy.get('button').contains('Post Item').click()
    cy.url().should('include', '/post')
  })
})




describe('Navigate to Settings', () => {
  beforeEach(() => {
    cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/') // replace with your app's URL
  })

  it('should navigate to the Settings', () => {
    // Click the menu button to open the sidebar
    cy.get('#menu').click()

    // Click the 'Settings' button in the sidebar
    // cy.get('.sidebarButton').contains('Settings').click()
    cy.get('button').contains('Settings').click()

    // Check that the URL includes '/settings'
    cy.url().should('include', '/settings')
  })
})

describe('Navigate to Settings', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000') // replace with your app's URL

    // Click the menu button to open the sidebar
    cy.get('#menu').click()

    // Click the 'Settings' button in the sidebar
    cy.get('button').contains('Settings').click()
  })

  it('should log in', () => {
    // Click the 'Log In' button in the sidebar
    cy.get('button').contains('Log In').click()

    // Fill in the login form
    // Replace 'input[name="username"]' and 'input[name="password"]' with the actual selectors for the username and password fields
    cy.get('input[name="username"]').type('nmandke')
    cy.get('input[name="password"]').type('1234')

    // Click the 'Submit' button
    cy.get('input[type="button"]').click()

    // Check that the URL includes '/profile' to confirm that the user is logged in
    // Replace '/profile' with the actual path that the user is redirected to after logging in
    // cy.url().should('include', '/profile')

    // Click the menu button to open the sidebar
    cy.get('#menu').click()
    cy.get('button').contains('My Profile').click()

    // Check that the username is 'nmandke'
    cy.get('#username').should('contain', 'nmandke')
  })
 
})

describe('Post Item', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000') // replace with your app's URL

    // Click the menu button to open the sidebar
    cy.get('#menu').click()

    // Click the 'Settings' button in the sidebar
    // cy.get('.sidebarButton').contains('Settings').click()
    cy.get('button').contains('Settings').click()

    // Click the 'Log In' button in the sidebar
    cy.get('button').contains('Log In').click()

    // Fill in the login form
    // Replace 'input[name="username"]' and 'input[name="password"]' with the actual selectors for the username and password fields
    cy.get('input[name="username"]').type('nmandke')
    cy.get('input[name="password"]').type('1234')

    // Click the 'Submit' button
    cy.get('input[type="button"]').click()

    // Go to the Post Item page
    cy.get('button').contains('Post Item').click()
    cy.url().should('include', '/post')
  })

  it('should fill out and submit the form with a picture', () => {
    cy.get('input[name="name"]').type('Nintendo 3DS')
    cy.get('textarea[name="description"]').type('This is a Nintendo 3DS, a technology item. It is in good condition and comes with a charger and a case. Posted for testing.')
    cy.get('select[name="tags"]').select('Technology')
    cy.get('select[name="pickUpType"]').select('Drop Off')
    cy.get('textarea[name="pickUpLocation"]').type('Test Location')
  
    // Upload a picture
    cy.fixture('3ds_image.jpg', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: '3ds_image.jpg',
          mimeType: 'image/jpeg',
          encoding: 'utf-8'
        })
      })
  
    cy.get('button[type="submit"]').click()
  })
})