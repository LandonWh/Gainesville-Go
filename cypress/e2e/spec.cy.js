describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('http://localhost:4200/register')

    cy.get('firstName').type('kyle')
  })
})