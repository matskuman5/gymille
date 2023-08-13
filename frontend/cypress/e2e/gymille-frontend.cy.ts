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
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/reset');
  });

  it('can log in', function () {
    cy.visit('http://localhost:5173/front/user');
    cy.get('[data-cy="username-field"]').type('GymBro1');
    cy.get('[data-cy="password-field"]').type('password123');
    cy.get('[data-cy="login-button"]').click();
    cy.contains('Logged in successfully');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3000/api/login', {
        username: 'GymBro1',
        password: 'password123',
      });
      cy.visit('http://localhost:5173/front');
    });

    it('can log out', function () {
      cy.get('[data-cy="user-expand-button"]').click({
        multiple: true,
      });
      cy.contains('Logout').should('be.visible');
      cy.get('[data-cy="logout-button"]').click({
        multiple: true,
      });
      cy.contains('Logged out successfully');
    });

    it('can change password', function () {
      cy.visit('http://localhost:5173/front/user/change-password');
      cy.get('[data-cy="new-password-field"]').type('newpassword500');
      cy.get('[data-cy="change-password-button"]').click();
      cy.contains('Password updated successfully');
    });
  });
});
