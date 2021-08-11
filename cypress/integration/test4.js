/// <reference types='Cypress'/>
describe('Multiple elements test suite', () => {
  it('case', () => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice');

    //check boxes
    cy.get('#checkBoxOption1')
      .check()
      .should('be.checked')
      .and('have.value', 'option1');
    cy.get('#checkBoxOption1').uncheck().should('be.not.checked');
    cy.get('input[type="checkbox"]').check(['option2', 'option3']);

    //static dropdown
    cy.get('select').select('option2').should('have.value', 'option2');

    //dinamic dropdown
    cy.get('#autocomplete').type('ind');
    cy.get('.ui-menu-item').each(($item, index, $list) => {
      if ($item.text() === 'India') {
        $item.click();
      }
    });
    cy.get('#autocomplete').should('have.value', 'India');

    //visibility
    cy.get('#displayed-text').should('be.visible');
    cy.get('#hide-textbox').click();
    cy.get('#displayed-text').should('not.be.visible');
    cy.get('#show-textbox').click();

    //pop-up or alerts
    cy.get('#alertbtn').click();
    cy.get('#confirmbtn').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.be.equal(
        'Hello , share this practice page and share your knowledge'
      );
    });
    //window open in a new tab
    cy.get('#opentab').invoke('removeAttr', 'target').click();
    cy.url().should('include', 'rahulshettyacademy');
    cy.go('back');

    //siblings
    cy.get('tr td:nth-child(2)').each(($item, index, $list) => {
      const text = $item.text();
      if (text.includes('Python')) {
        cy.get('tr td:nth-child(2)')
          .eq(index)
          .next()
          .then((price) => {
            const priceText = price.text();
            expect(priceText).to.equal('25');
          });
      }
    });

    //mouse over
    cy.get('.mouse-hover-content').invoke('show');
    cy.contains('Top').click();
    cy.url().should('include', 'top');
  });
});
