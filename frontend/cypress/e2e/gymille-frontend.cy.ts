describe('Basic ', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:5173/front');
    cy.contains('Gymille!');
  });
});
