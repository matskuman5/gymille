describe('Basic ', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:5173/front');
    cy.contains('Gymille!');
  });

  it('login warning functions properly', function () {
    cy.visit('http://localhost:5173/front');
    cy.contains('Dismiss').click();
    cy.contains('Dismiss').should('not.exist');
    cy.reload();
    cy.contains('Dismiss').should('not.exist');
  });
});

describe('Account', function () {
  it('can log in', function () {
    cy.visit('http://localhost:5173/front/user');
    cy.get('[data-cy="username-field"]').type('GymBro1');
    cy.get('[data-cy="password-field"]').type('password123');
    cy.get('[data-cy="login-button"]').click();
    cy.contains('Logged in successfully');
  });
});
