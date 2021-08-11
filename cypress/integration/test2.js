/// <reference types='Cypress'/>
describe('My second test suite', () => {
  it('my second case', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);
    cy.get('.products').as('productsLocator');
    cy.get('@productsLocator')
      .find('.product')
      .each(($item, index, $list) => {
        const textVeg = $item.find('h4.product-name').text();
        if (textVeg.includes('Cashews')) {
          $item.find('button').click();
        }
      });
    cy.get('.cart-icon > img').click();
    cy.contains('PROCEED TO CHECKOUT').click();
    cy.contains('Place Order').click();
  });
});
