import { mount } from './dist/index';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mount your component into Cypress sandbox
       * @param component content to render by lit-html render function
       * @param options render options for custom rendering
       */
      mount: typeof mount;
    }
  }
}

export {};
