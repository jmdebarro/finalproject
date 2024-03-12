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
  // Add more test cases as needed

  // Add more test cases as needed
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
    cy.get('.menuButton').click()
    cy.url().should('include', '/post')
  })
})