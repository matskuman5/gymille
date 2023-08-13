describe('Basic', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('front page can be opened', function () {
    cy.contains('Gymille!');
  });

  it('login warning functions properly', function () {
    cy.contains('Dismiss').click();
    cy.contains('Dismiss').should('not.exist');
    cy.reload();
    cy.contains('Dismiss').should('not.exist');
  });
});
