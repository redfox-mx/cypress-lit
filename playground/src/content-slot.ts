import { customElement } from 'lit/decorators.js';
import { LitElement, css, html } from 'lit';

@customElement('content-slot')
export class ContentSlotElement extends LitElement {

  static styles = css`
    p {
      font-weight: bold;
    }

    ::slotted(*) {
      font-weight: initial;
    }
  `;
  render() {
    return html`
    <p>This content is a slot:
      <slot>
        with default text
      </slot>
    </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'content-slot': ContentSlotElement;
  }
}
