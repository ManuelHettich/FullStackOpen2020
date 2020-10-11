describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Foo',
      username: 'foo',
      password: 'bar',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#login-form')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })
})

describe('when logged in', function () {
  beforeEach(function () {
    cy.login({ username: 'foo', password: 'bar' })
  })
})
