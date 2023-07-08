import './elements/app-counter';
import { html } from 'lit';

describe('mount', () => {

  it('should mount element', () => {
    cy.mount<'app-counter'>(html`<app-counter></app-counter>`);
    cy.get('app-counter').should('exist');
  })

  it('shold return chainable reference to element', () => {
    const counter = cy.mount<'app-counter'>(html`<app-counter></app-counter>`);
    counter
      .shadow()
      .contains('Count is 0')
  })

  it('should interact with element', () => {
    cy.mount<'app-counter'>(html`<app-counter></app-counter>`);
    cy.get('app-counter')
      .shadow()
      .contains('+1')
      .click()
      .click()

    cy.get('app-counter')
      .shadow()
      .contains('Count is 2')
  })

  it('should interact with element returned reference', () => {
    cy.mount<'app-counter'>(html`<app-counter></app-counter>`)
    .then((element) => {
      const [counter] = element
      counter.decrement()
    })

    cy.get('app-counter')
      .shadow()
      .contains('Count is -1')
  })

})
