# Cypress Component Testing for Lit

<p align="center">
  <img width="250" height="200" src="https://raw.githubusercontent.com/redfox-mx/cypress-lit/main/docs/lit.svg">
</p>

> "Use all the power of cypress component testing with Lit and web components. ⚡"

This package provides configuration and commands for test web components with all the magic of Lit templates (aka. lit-html) and the power of cypress. 

## Getting started

To install, run:

```bash
npm install -D cypress-ct-lit
```

Once you have the package installed alongside Cypress, you can run `npx cypress open`, choose "Component Testing", and Lit should appear in the list of frameworks available.

Learn more about [third-party definitions](https://docs.cypress.io/guides/component-testing/third-party-definitions)

## Configuration

Add `cypress-ct-lit` framework to your `cypress.config.{ts,js}` file

```ts
export default defineConfig({
  component: {
    devServer: {
      framework: 'cypress-ct-lit',
      bundler: 'vite', // or 'webpack'
      // more config here
    }
  }
})
```
If you're using TypeScript, you may get a type error when setting the framework property. If so, you'll need to typecast it as `any`

```ts
framework: 'cypress-ct-lit' as any,
```
## Adding mount Command

Next, add the following lines to your `component.ts`

```ts
import { mount } from 'cypress-ct-lit'

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
```
## Usage notes

You can now mount any html content with Lit in a component test, for example:

```ts
import { html } from 'lit';

it('should display content', () => {
  const text = 'I will show up in the test'
  cy.mount(html`<div id='content'>${text}</div>`);

  cy.get('#content').should('contain.text', text);
})

it('should display html', () => {
  const text = 'strings templates are also allowed'
  cy.mount(`<div id='content'>${text}</div>`);

  cy.get('#content').should('contain.text', text);
})
```

Or find content inside your web component

```ts
import 'path/to/my-element';
import { html } from 'lit';

it('should render its children', () => {
  cy.mount(html`<my-element></my-element>`);

  cy.get('my-element')
    .shadow().find('.my-part')
    .should('exist')
})
```
For more examples and basic usages see ´cypress/component´ examples

> __Note__: You may prefer use `includeShadowDom` option to avoid write `shadow()` command on every test.
>
>```typescript
> export default defineConfig({
>  includeShadowDom: true,
>  component: {
>    devServer: {
>      framework: 'cypress-ct-lit',
>      bundler: 'vite', // or 'webpack'
>      // more config here
>    }
>  }
>})
>```

