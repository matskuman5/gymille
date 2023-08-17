describe('Sessions', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/reset');
  });

  describe('when not logged in', function () {
    beforeEach(function () {
      cy.visit('/');
    });

    it('shows empty session list properly', function () {
      cy.visit('/sessions');
      cy.contains('No sessions created yet!');
    });

    it('can create sessions and store them', function () {
      cy.get('[data-cy="session-name-field"]').type('Super Push');
      cy.get('[data-cy="add-exercise-button"]').click();
      cy.get('[data-cy="exercise-forms"]')
        .get('[data-cy="exercise-name-field"]')
        .type('press');
      cy.get('[data-cy="exercise-forms"]')
        .get('[data-cy="exercise-sets-field"]')
        .type('4');
      cy.get('[data-cy="exercise-forms"]')
        .get('[data-cy="exercise-reps-field"]')
        .type('12');
      cy.get('[data-cy="exercise-forms"]')
        .get('[data-cy="exercise-weight-field"]')
        .type('50');

      cy.get('[data-cy="submit-button"]').click();
      cy.visit('/sessions').contains('Super Push');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3000/api/login', {
        username: 'GymBro1',
        password: 'password123',
      });
      cy.visit('/');
    });

    it('can create sessions and store them', function () {
      cy.get('[data-cy="session-name-field"]').type('Super Push');
      cy.get('[data-cy="add-exercise-button"]').click();
      cy.get('[data-cy="exercise-forms"]')
        .get('[data-cy="exercise-name-field"]')
        .type('press');
      cy.get('[data-cy="exercise-forms"]')
        .get('[data-cy="exercise-sets-field"]')
        .type('4');
      cy.get('[data-cy="exercise-forms"]')
        .get('[data-cy="exercise-reps-field"]')
        .type('12');

      cy.get('[data-cy="submit-button"]').should('be.disabled');

      cy.get('[data-cy="exercise-forms"]')
        .get('[data-cy="exercise-weight-field"]')
        .type('50');

      cy.get('[data-cy="submit-button"]').click();
      cy.contains('saved successfully');

      cy.visit('/sessions').contains('Push');
      cy.visit('/sessions').contains('Super Push');
    });

    it('can load session template', function () {
      cy.get('[data-cy="session-template-selector"]').click();
      cy.contains('Push').click();
      cy.get('[data-cy="exercise-forms"]')
        .get('[data-cy="exercise-name-field"]')
        .first()
        .find('input')
        .invoke('val')
        .should('equal', 'Bench Press');
    });
  });
});
