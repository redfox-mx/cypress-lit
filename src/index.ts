import { getContainerEl, setupHooks } from '@cypress/mount-utils';
import { render, nothing, RenderOptions, TemplateResult } from 'lit';

let dispose: () => void;

function cleanup() {
  dispose?.();
}

export type Renderable = TemplateResult;

export interface MountLitTemplateOptions {
  render: RenderOptions;
  log: boolean;
}

export type MountOptions = Partial<MountLitTemplateOptions>;

export function mount<T extends keyof HTMLElementTagNameMap = any>(
  component: Renderable,
  options: MountOptions = {}
): Cypress.Chainable<JQuery<HTMLElementTagNameMap[T]>> {
  cleanup();

  const root = getContainerEl();
  render(component, root, options.render);

  dispose = () => {
    render(nothing, root);
  }

  return cy
    .wrap(root, { log: false })
    .wait(0, { log: false })
    .children()
    .first()
    .then((element) => {
      const name = element.prop("tagName").toLowerCase();

      // safe cast for current html element
      const el = document.getElementsByTagName<T>(name)[0];

      if(options.log !== false) {
        Cypress.log({
          name: 'mount',
          message: `<${name} ... />`
        })
        .snapshot('mounted')
        .end()
      }

      return cy.wrap(el, { log: false })
    })
}

setupHooks(cleanup);