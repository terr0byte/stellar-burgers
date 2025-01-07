describe('Тесты создания заказа', function () {
  beforeEach(() => {
    cy.setCookie('accessToken', 'accessToken');
    cy.intercept('GET', '*/auth/user', { fixture: 'authresponse.json' }).as(
      'getUser'
    );
    cy.visit('http://localhost:4000/');
    cy.wait('@getUser');
  });
  it('Тест сборки и отправки заказа', () => {
    cy.intercept('POST', '*/orders', { fixture: 'orderresponse.json' }).as(
      'postOrder'
    );
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.contains('Краторная булка N-200i').parents('li').find('button').click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .find('button')
      .click();
    cy.contains('Оформить заказ').click();
    cy.wait('@postOrder');
    cy.get(`[data-cy=${'modal'}]`).should('exist').and('contain', '64860');
    cy.get(`[data-cy=${'modal'}]`).find('button').click();
    cy.get(`[data-cy=${'topbun'}]`).should('not.exist');
    cy.get(`[data-cy=${'no-ingredients'}]`).should('exist');
  });
});
