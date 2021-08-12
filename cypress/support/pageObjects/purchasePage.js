export class PurchasePage {
  getContryField() {
    return cy.get('#country');
  }
  getAgreeBox() {
    return cy.get('#checkbox2');
  }
  getContryOptions() {
    return cy.get('.suggestions > ul > li > a');
  }
  getPurchaseButton() {
    return cy.contains('Purchase');
  }
  getConfirmation() {
    return cy.get('.alert');
  }
}
