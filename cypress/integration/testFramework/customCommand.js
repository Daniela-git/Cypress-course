/// <reference types='Cypress'/>

describe('Frames test suite', () => {
  before(function () {
    //all set-up
    cy.fixture('example').then((data) => {
      this.data = data;
    });
  });
  it('frame case', function () {
    cy.visit('https://rahulshettyacademy.com/angularpractice/');
    cy.get(':nth-child(2) > .nav-link').click();
    this.data.productName.forEach((element) => {
      cy.selectProduct(element);
    });
  });
});
