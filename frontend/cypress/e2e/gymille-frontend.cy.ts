describe('Basic ', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:5173/front');
    cy.contains('Gymille!');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    );
  });
});
