export class CheckoutPage {
  getItemPrices() {
    return cy.get('tr td:nth-child(4) > strong');
  }
  getCheckoutButton() {
    return cy.contains('Checkout');
  }
}
