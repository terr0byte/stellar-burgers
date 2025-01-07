describe('Тесты конструктора и ингредиентов', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });
  it('Тест на добавление ингредиента', () => {
    cy.contains('Краторная булка N-200i').parents('li').find('button').click();
    cy.get(`[data-cy=${'topbun'}]`, { timeout: 1000 })
      .should('exist')
      .and('contain', 'Краторная булка N-200i');
  });
  it('Тест на открытие и закрытие модального окна ингредиента', () => {
    cy.contains('Краторная булка N-200i').parents('li').click();
    cy.get(`[data-cy=${'modal'}]`)
      .should('exist')
      .and('contain', 'Краторная булка N-200i');
    cy.get(`[data-cy=${'modal'}]`).find('button').click();
    cy.get(`[data-cy=${'modal'}]`).should('not.exist');
  });
});
