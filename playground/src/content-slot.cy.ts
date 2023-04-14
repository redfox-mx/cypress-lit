import { html } from 'lit';
import './content-slot';

describe('element with slot', () => {

  it('should be mounted', () => {
    cy.mount(html`<content-slot></content-slot>`);
    cy.get('content-slot');
  });

  it('should display default text', () => {
    cy.mount(html`<content-slot></content-slot>`);
    cy.get('content-slot')
      .shadow()
      .contains('with default text')
  })

  it('should display content in slot', () => {
    const text = 'my text';
    cy.mount(html`<content-slot>${text}</content-slot>`);
    cy.get('content-slot')
      .contains(text);
  })
})
