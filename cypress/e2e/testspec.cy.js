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


describe('Post Item', () => {
  beforeEach(() => {
    cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/') // replace with your app's URL

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
    cy.get('textarea[name="description"]').type('This is a Nintendo 3DS, a technology item. It is in good condition.')
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
    cy.wait(1000)
  })
})

describe('Delete item in', () => {
  const info = Math.random().toString();
  beforeEach(() => {
      cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/');
  // Click the menu button to open the sidebar
  cy.get('#menu').click();

  // Click the 'Settings' button in the sidebar
  cy.get('button').contains('Settings').click();
  cy.get('button').contains('Log In').click();
  cy.get('input[name="username"]').type('nmandke');
  cy.get('input[name="password"]').type('1234');
  cy.get('input[type="button"]').click();

  cy.get('#menu').click();
  cy.wait(1000)
  cy.get('button').contains('My Profile').click();
  })

  it('Verify and delete item in MyProfile', () => {
      cy.get('a').should('exist').and('contain', 'This is a Nintendo 3DS, a technology item. It is in good condition.');
      cy.contains('a', 'This is a Nintendo 3DS, a technology item. It is in good condition.')
      .within(() => {
        cy.get('input').click()
      });
      cy.wait(500);
      cy.get('a').contains('This is a Nintendo 3DS, a technology item. It is in good condition.').should('not.exist');
  })

})