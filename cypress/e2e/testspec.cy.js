
// Example test spec for a Navbar component

// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000') // replace with your app's URL
  })

  it('should render the Navbar', () => {
    cy.get('nav').should('exist') // replace 'nav' with a selector that selects your Navbar
  })

  // Add more test cases as needed
})