<p align="center">
  <img width="250" height="200" src="https://raw.githubusercontent.com/redfox-mx/cypress-lit/main/docs/lit.svg">
</p>

# Cypress Component Testing for Lit

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
      // more config here
    }
  }
})
```
If you're using TypeScript, you may get a type error when setting the framework property. If so, you'll need to typecast it as any

```ts
framework: 'cypress-ct-lit' as any,
```
## Adding mount Command

Next, add the following lines to your `component.{js.ts}`

```ts
import { mount } from 'cypress-ct-lit'

Cypress.Commands.add('mount', mount)
```
Optionally, this package brings custom types definitions. Add the following to `tsconfig.json` or `jsconfig.json` in your project.

```json
{
  "compilerOptions": {
    // more compiler options...
    "types": [
      "cypress",
      "cypress-ct-lit/types"
    ]
  }
}
```
## Usage notes

You can now mount any html content with Lit in a component test, for example:

```ts
import { html } from 'lit'

it('should display content', () => {
  const text = 'I will show up in the test'
  cy.mount(html`<div id='content'>${text}</div>`)

  cy.get('#content').should('contain.text', text)
})
```

Or find content inside your web component

```ts
import { html } from 'lit'

it('should render its children', () => {
  cy.mount(html`<my-element></my-element>`)

  cy.get('my-element')
    .shadow().find('.my-part')
    .should('exist')
})
```
## Special thanks

[@kgroat](https://gitlab.com/kgroat) I use some of his assets like lit logo and copy some docs. I'm not so good writing docs but his project offers a lot of information. See: [Cypress Lit Component Test Definition](https://gitlab.com/kgroat/cypress-ct-lit-element) for more info ❤️
