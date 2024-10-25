import { getContainerEl, setupHooks } from '@cypress/mount-utils';
import { render, nothing, type RenderOptions, html, type HTMLTemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

let dispose: () => void;

function cleanup() {
  dispose?.();
}

export interface MountLitTemplateOptions {
  render: RenderOptions;
  log: boolean;
}

export type MountOptions = Partial<MountLitTemplateOptions>;

export function mount<T extends keyof HTMLElementTagNameMap = any>(
  template: HTMLTemplateResult | string,
  options: MountOptions = {}
): Cypress.Chainable<JQuery<HTMLElementTagNameMap[T]>> {
  cleanup();

  const root = getContainerEl();
  const value = typeof template === 'string' ? html`${unsafeHTML(template)}` : template;
  render(value, root, options.render);

  dispose = () => {
    render(nothing, root);
  }

  return cy
    .wrap(root, { log: false })
    .wait(0, { log: false })
    .children({log: false })
    .first({log: false })
    .then((element) => {
      const name = element.prop("tagName").toLowerCase();

      // safe cast for current html element
      const el = document.getElementsByTagName<T>(name)[0];

      if(options.log !== false) {
        Cypress.log({
          name: 'mount',
          displayName: 'mount',
          message: `<${name} ... />`
        })
        .snapshot('mounted')
        .end()
      }

      return cy.wrap(el, { log: false })
    })
}

setupHooks(cleanup);

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
