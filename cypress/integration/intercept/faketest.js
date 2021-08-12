/// <reference types='Cypress'/>

describe('Trying intercept suit', () => {
  it('intercept test', () => {
    cy.visit(Cypress.env('url') + 'angularAppdemo/');
    cy.intercept(
      //Cypress listen to get the request
      {
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      },
      //the fake data you wath to send
      {
        statusCode: 200,
        body: [
          { book_name: 'RestAssured with Java', isbn: 'BSG', aisle: '2302' },
        ],
      }
    ).as('bookretrievals');
    cy.get('button[class="btn btn-primary"]').click();
    //with this we are saying: wait till @bookretrievals ends. After this element has two properties request and response, so we are gonna use them
    cy.wait('@bookretrievals').should(({ request, response }) => {
      //+1 because the titles
      cy.get('tr').should('have.length', response.body.length + 1);
    });
    cy.get('p').should('have.text', 'Oops only 1 Book available');

    //number the rows in the table should be the same response array
  });
});
