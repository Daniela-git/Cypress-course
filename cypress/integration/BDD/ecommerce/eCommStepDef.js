import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  HomePage,
  ShopPage,
  CheckoutPage,
  PurchasePage,
} from '../../../support/pageObjects';
const homePage = new HomePage();
const shopPage = new ShopPage();
const checkoutPage = new CheckoutPage();
const purchasePage = new PurchasePage();

Given('I open Ecommerce page', () => {
  cy.visit(Cypress.env('url') + 'angularpractice/');
});

When('I add items to cart', function () {
  homePage.getShopTab().click();
  this.data.productName.forEach((element) => {
    cy.selectProduct(element);
  });
  shopPage.getCheckoutButton().click();
});

And('Validate the total prices', () => {
  let sum = 0;
  checkoutPage.getItemPrices().each((itemPrice, index, list) => {
    const actualText = itemPrice.text();
    const textPrice = actualText.split(' ')[1].trim();
    const price = parseInt(textPrice);
    sum = sum + price;
  });
  cy.get('h3 strong').then((element) => {
    const amount = element.text();
    let textTotal = amount.split(' ')[1].trim();
    expect(Number(textTotal)).to.equal(sum);
  });
  checkoutPage.getCheckoutButton().click();
});

Then('Select the country submit and verify thank you', () => {
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
