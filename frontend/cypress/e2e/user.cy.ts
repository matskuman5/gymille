describe('User', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/reset');
  });

  it('can log in', function () {
    cy.visit('/user');
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
      cy.visit('/');
    });

    it('can log out', function () {
      cy.get('[data-cy="user-expand-button"]').first().click();
      cy.contains('Logout').should('be.visible');
      cy.get('[data-cy="logout-button"]').first().click();
      cy.contains('Logged out successfully');
    });

    it('can change password', function () {
      cy.visit('/user/change-password');
      cy.get('[data-cy="new-password-field"]').type('newpassword500');
      cy.get('[data-cy="change-password-button"]').click();
      cy.contains('Password updated successfully');
    });
  });
});
