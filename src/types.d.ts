import { mount } from './index';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mount your component into Cypress sandbox
       * @param component content to render by lit-html render function
       * @param options render options to custom rendering
       */
      mount: typeof mount;

      /**
       * Custom commad to define Web Component into registry;
       * @example cy.define('app-button', AppButton)
       */
      defineCustomElement<T extends CustomElementConstructor>(name: string, component: T, options?: ElementDefinitionOptions): void;
    }
  }
}

export {};
