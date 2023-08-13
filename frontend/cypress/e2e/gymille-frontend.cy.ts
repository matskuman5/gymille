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
