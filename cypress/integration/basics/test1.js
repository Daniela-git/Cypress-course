/// <reference types='Cypress'/>
describe('My first test suite', () => {
  it('my first case', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);
    cy.get('.product:visible').should('have.length', 4);
    cy.get('.products').as('productsLocator');
    cy.get('@productsLocator').find('.product').should('have.length', 4);
    cy.get('@productsLocator')
      .find('.product')
      .eq(1)
      .contains('ADD TO CART')
      .click();
    cy.get('@productsLocator')
      .find('.product')
      .each(($item, index, $list) => {
        const textVeg = $item.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          $item.find('button').click();
        }
      });
  });
});
