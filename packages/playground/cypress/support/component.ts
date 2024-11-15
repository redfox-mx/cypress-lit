import { mount } from 'cypress-ct-lit';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mount your template/component into Cypress sandbox
       * @param template
       * @param options render options for custom rendering
       */
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount)
