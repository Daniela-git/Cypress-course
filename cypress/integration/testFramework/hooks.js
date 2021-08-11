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
    cy.get('.form-group input[name="name"]').type(this.data.name);
    cy.get('select').select(this.data.gender);
    cy.get('h4 input[name="name"]').should('have.value', this.data.name);
    cy.get('.form-group input[name="name"]').should(
      'have.attr',
      'minlength',
      '2'
    );
    cy.get('#inlineRadio3').should('be.disabled');
  });
});
