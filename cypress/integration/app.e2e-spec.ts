describe('My First Test', () => {
  
  it('should display correct page title', () => {
    cy.visit('/')

    cy.title().should('eq', 'FrontendStarter')
  })

  it('should display welcome message', () => {
    cy.visit('/')

    cy.get('app-root h2').contains('Welcome to frontend-starter!')
  })
})
