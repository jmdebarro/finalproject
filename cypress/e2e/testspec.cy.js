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

describe('Login Test', () => {
  it('should navigate to the login page and log in', () => {
    // Visit the homepage
    cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/')

    // Open the menu
    cy.get('.menuButton').click()

    // Click on the 'Settings' button in the menu
    cy.get('.sidebarButton').contains('Settings').click()

    // Click on the 'Log In' button
    cy.get('.button').contains('Log In').click()

    // Fill out the login form
    cy.get('input[name="username"]').type('nmandke')
    cy.get('input[name="password"]').type('1234')

    // Submit the login form
    cy.get('button[type="submit"]').click()
  })
})

describe('Post Item', () => {
  beforeEach(() => {
    cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/') // replace with your app's URL
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
}) // This was missing

describe('Navigate to Settings', () => {
  beforeEach(() => {
    cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/') // replace with your app's URL
  })

  it('should navigate to the Settings', () => {
    cy.get('.menuButton').click()
    cy.url().should('include', '/post')
  })
})