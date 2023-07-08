import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const tagName = 'app-counter';

@customElement(tagName)
export class AppCounter extends LitElement {

  @property({ type: Number, attribute: true })
  value = 0;

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }

  render() {
    return html`
      <p>Count is ${this.value}</p>
      <button @click="${this.increment}">+1</button>
      <button @click="${this.decrement}">-1</button>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    [tagName]: AppCounter;
  }
}
