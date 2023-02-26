describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('http://localhost:8080/register')

    cy.get('firstName').type('kyle')
  })
})