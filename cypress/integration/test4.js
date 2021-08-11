/// <reference types='Cypress'/>
/// <reference types='cypress-iframe'/>
import 'cypress-iframe';

describe('Frames test suite', () => {
  it('frame case', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice');
    cy.frameLoaded('#courses-iframe'); //which is the iframe
    //swich to the iframe
    cy.iframe().find('a[href*="mentorship"]').eq(0).click();
    cy.iframe().find('h1[class*="pricing-title"]').should('have.length', 2);
  });
});
