describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('https://delightful-island-0985f9e1e.4.azurestaticapps.net/') // replace with your app's URL
  })

  it('should render the Navbar', () => {
    cy.get('nav').should('exist') // replace 'nav' with a selector that selects your Navbar
  })
  it('should render the Search', () => {
    cy.get('#Search').should('exist') // replace 'nav' with a selector that selects your Navbar
  })
  // Add more test cases as needed
})