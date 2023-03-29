describe('Register and login Page', () => {
  it ('Should direct users to the registration page when pressing "Create Account"', () =>{
    cy.visit('http://localhost:4200/login')
    cy.get('[data-cy="createAccount"]').click();
  })
  //This adds the email to the database, so for each new test, a new email must be added, until we implement the delete account function. 
  it('Should redirect the user to the home page upon a successful login', () => {
    cy.visit('http://localhost:4200/register')
    cy.get('[data-cy="firstName"]').type('bob')
    cy.get('[data-cy="lastName"]').type('joe')
    cy.get('[data-cy="email"]').type('bob.joe5@gmail.com')
    cy.get('[data-cy="password"]').type('bobjoespassword')
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/login$/)
  })
  it('Should attemp a log in with an already entered account', () => {
    cy.visit('http://localhost:4200/login')
    cy.get('[data-cy="email"]').type('bob.joe1@gmail.com')
    cy.get('[data-cy="password"]').type('bobjoespassword')
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/home$/)
  })
  it('Should attemp a log in with an nonexistent account', () => {
    cy.visit('http://localhost:4200/login')
    cy.get('[data-cy="email"]').type('notanemail@gmail.com')
    cy.get('[data-cy="password"]').type('bobjoespassword')
    cy.get('[data-cy="submit"]').click();
    cy.url().should('match', /\/login$/)
  })
})