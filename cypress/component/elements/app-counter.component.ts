import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import litLogo from './lit.svg';
import styles from './app-counter.styles.css';

console.log(styles);

export const tagName = 'app-counter';

@customElement(tagName)
export class AppCounter extends LitElement {

  @property({ type: Number, attribute: true })
  value = 0;

  static styles = styles;

  public clicked: (source: AppCounter) => void = () => {};

  private async _onClick(e: MouseEvent) {
    this.value++;
    await this.updateComplete;

    this.clicked(this);
  }

  render() {
    return html`
      <a href="https://lit.dev" target="_blank" aria-label="Lit logo">
        ${litLogo} <!-- svg template -->
      </a>
      <div>
        <h1>Count is ${this.value}</h1>
        <button @click=${this._onClick}>Add more</button>
      </div>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    [tagName]: AppCounter;
  }
}
