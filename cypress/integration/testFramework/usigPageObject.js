/// <reference types='Cypress'/>
import {
  HomePage,
  ShopPage,
  CheckoutPage,
  PurchasePage,
} from '../../support/pageObjects';

describe('Frames test suite', () => {
  before(function () {
    //all set-up
    cy.fixture('example').then((data) => {
      this.data = data;
    });
  });
  it('frame case', function () {
    const homePage = new HomePage();
    const shopPage = new ShopPage();
    const checkoutPage = new CheckoutPage();
    const purchasePage = new PurchasePage();
    cy.visit(Cypress.env('url') + 'angularpractice/');
    homePage.getEditBox().type(this.data.name);
    homePage.getGender().select(this.data.gender);
    homePage.getTwoWayDataBinding().should('have.value', this.data.name);
    homePage.getEditBox().should('have.attr', 'minlength', '2');
    homePage.getEntreptreneaur().should('be.disabled');
    homePage.getShopTab().click();
    //select products
    this.data.productName.forEach((element) => {
      cy.selectProduct(element);
    });
    shopPage.getCheckoutButton().click();

    let sum = 0;
    checkoutPage
      .getItemPrices()
      .each((item, index, list) => {
        const actualText = item.text();
        const textPrice = actualText.split(' ')[1].trim();
        const price = parseInt(textPrice);
        sum = sum + price;
      })
      .then(() => {
        cy.log(sum);
      });
    cy.get('h3 strong').then((element) => {
      const amount = element.text();
      let textTotal = amount.split(' ')[1].trim();
      expect(Number(textTotal)).to.equal(sum);
    });
    checkoutPage.getCheckoutButton().click();
    purchasePage.getContryField().type('In');
    purchasePage.getContryOptions().each((item, index, list) => {
      if (item.text().includes('India')) {
        list[index].click();
      }
    });
    purchasePage.getContryField().should('have.value', 'India');
    purchasePage.getAgreeBox().click({ force: true });
    purchasePage.getPurchaseButton().click();
    purchasePage
      .getConfirmation()
      .should(
        'include.text',
        'Success! Thank you! Your order will be delivered in next few weeks :-).'
      );
  });
});
