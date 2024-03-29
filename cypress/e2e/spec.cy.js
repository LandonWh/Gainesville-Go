describe('E2E Tests for sprint 4', () => {
  
  it ('Should direct users to the registration page when pressing "Create Account"', () =>{
    cy.viewport(1000, 1000)
    cy.visit('http://localhost:4200/login')
    cy.get('[data-cy="createAccount"]').click();
  })
  //This adds the email to the database, so for each new test, a new email must be added, until we implement the delete account function. 
  it('Should redirect the user to the login page upon a successful registration', () => {
    cy.visit('http://localhost:4200/register')
    cy.get('[data-cy="firstName"]').type('bob')
    cy.get('[data-cy="lastName"]').type('joe')
    cy.get('[data-cy="email"]').type('cypresstestaccount@cypress.com')
    cy.get('[data-cy="password"]').type('cypresspassword')
    cy.get('[data-cy="dob"]').type('3/20/2005')
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/login$/)
  })
  it ('Should attempt a registration with an email account that already exists', () => {
    cy.visit('http://localhost:4200/register')
    cy.get('[data-cy="firstName"]').type('bob')
    cy.get('[data-cy="lastName"]').type('joe')
    cy.get('[data-cy="email"]').type('cypresstestaccount@cypress.com')
    cy.get('[data-cy="password"]').type('bobjoespassword')
    cy.get('[data-cy="dob"]').type('3/20/2005')
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/register$/)
  })
  it('Should attempt a log in with an existing email and matching password, and then delete the account', () => {
    cy.viewport(1000, 1000)
    cy.visit('http://localhost:4200/login')
    cy.get('[data-cy="email"]').type('cypresstestaccount@cypress.com')
    cy.get('[data-cy="password"]').type('cypresspassword')
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/home$/)
    cy.get('[data-cy="goToAccountPage"]').click();
    cy.get('[data-cy="deleteAccount"]').click();
    cy.url().should('match', /\/delete$/)
    cy.get('[data-cy="email"]').type('cypresstestaccount@cypress.com')
    cy.get('[data-cy="password"]').type('cypresspassword')
    cy.get('[data-cy="delete"]').click();
    cy.url().should('match', /\/login$/)
    cy.get('[data-cy="email"]').type('cypresstestaccount@cypress.com')
    cy.get('[data-cy="password"]').type('cypresspassword')
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/login$/)
  })
  it('Should attemp a log in with a nonexistent email and an existing password', () => {
    cy.visit('http://localhost:4200/login')
    cy.get('[data-cy="email"]').type('notanemail@gmail.com')
    cy.get('[data-cy="password"]').type('bobjoespassword')
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/login$/)
  })
  it('Should attemp a log in with an existing email and a non matching password', () => {
    cy.visit('http://localhost:4200/login')
    cy.get('[data-cy="email"]').type('admintestacc@gmail.com')
    cy.get('[data-cy="password"]').type('bobjoespassword')
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/login$/)
  })
})