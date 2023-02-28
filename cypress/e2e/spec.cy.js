describe('Register and login Page', () => {
  it ('Should direct users to the registration page when pressing "Create Account"', () =>{
    cy.visit('http://localhost:4200/login')
    cy.get('[data-cy="createAccount"]').click();
  })
  it('Should show validation errors when leaving all fields blank', () => {
    cy.visit('http://localhost:4200/register')
  })
})