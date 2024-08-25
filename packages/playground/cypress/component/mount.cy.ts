import './elements/app-counter'
import { html } from 'lit'

describe('mount', () => {

  it('should mount element', () => {
    cy.mount(html`<app-counter></app-counter>`)
    cy.get('app-counter').should('exist')
  })

  it('should mount string template', () => {
    const element = 'app-counter';
    cy.mount(`<${element}></${element}>`)
    cy.get('app-counter').should('exist')

    cy.get('app-counter')
      .shadow()
      .contains('Count is 0')
  })

  it('should return chainable reference to element', () => {
    const counter = cy.mount<'app-counter'>(html`<app-counter></app-counter>`)
    counter
      .shadow()
      .contains('Count is 0')
  })

  it('should clean DOM if mount is called more than one time', () => {
    cy.mount(html`<div id="mount1">mount 1</div>`)
    cy.mount(html`<div id="mount2">mount 2</div>`)

    cy.get('#mount1').should('not.exist')
    cy.get('#mount2').should('exist')
  })

})

describe('<counter-app .../>', () => {

  it('should mount', () => {
    cy.mount(html`<app-counter></app-counter>`)
    cy.get('app-counter').should('exist')
  })

  it('should set attribute value', () => {
    cy.mount(html`<app-counter value="5"></app-counter>`)
    cy.get('app-counter')
      .shadow()
      .contains('Count is 5')

    cy.get('app-counter')
      .should('have.prop', 'value', 5)

    cy.mount(html`<app-counter .value="${10}"></app-counter>`)
    cy.get('app-counter')
      .shadow()
      .contains('Count is 10')

    cy.get('app-counter')
      .should('have.prop', 'value', 10)

  })

  it('should increment counter', () => {
    cy.mount(html`<app-counter></app-counter>`)
    cy.get('app-counter')
      .shadow()
      .contains('+1')
      .click()

    cy.get('app-counter')
      .shadow()
      .contains('Count is 1')
  })

  it('should decrement counter', () => {
    cy.mount(html`<app-counter></app-counter>`)
    cy.get('app-counter')
      .shadow()
      .contains('-1')
      .click()

    cy.get('app-counter')
      .shadow()
      .contains('Count is -1')
  })

  it('should track value of counter', () => {
    cy.mount(html`<app-counter></app-counter>`)
    cy.get('app-counter')
      .should('have.prop', 'value', 0)

    cy.get('app-counter')
      .shadow()
      .contains('+1')
      .click()

    cy.get('app-counter')
      .should('have.prop', 'value', 1)
  })
})
