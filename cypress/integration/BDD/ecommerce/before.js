before(function () {
  //all set-up
  cy.fixture('example').then((data) => {
    this.data = data;
  });
});
