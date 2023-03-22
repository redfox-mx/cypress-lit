declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom commad to define Web Component into registry;
       * @example cy.define('app-button', AppButton)
       */
      defineCustomElement<T extends CustomElementConstructor>(name: string, component: T, options?: ElementDefinitionOptions): void;
    }
  }
}

export {};
