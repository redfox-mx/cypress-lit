import './elements/app-counter.component';
import { html } from 'lit';

describe('lit mount', () => {
  it('should mount element', () => {
    cy.mount<'app-counter'>(html`<app-counter></app-counter>`);
    cy.get('app-counter')
      .shadow()
      .contains('h1', 'Count is 0');
  })
})
