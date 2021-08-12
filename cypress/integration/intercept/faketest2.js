/// <reference types='Cypress'/>

describe('Trying intercept suit', () => {
  it('intercept test', () => {
    cy.visit(Cypress.env('url') + 'angularAppdemo/');
    cy.intercept(
      'GET',
      'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      (req) => {
        req.url =
          'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra';
        req.continue((res) => {
          expect(res.statusCode).to.equal(403);
        });
      }
    ).as('dummy');
    cy.get('button[class="btn btn-primary"]').click();
    cy.wait('@dummy');
  });
});
