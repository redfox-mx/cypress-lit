import { getContainerEl, setupHooks } from "@cypress/mount-utils";
import { render, nothing, RenderOptions } from "lit";

Cypress.on("run:start", () => {
  if (Cypress.testingType !== "component") {
    return;
  }

  Cypress.Commands.add("defineCustomElement", (name, component, options) => {
    // Avoid double-registering a Web Component.
    if (window.customElements.get(name)) {
      return;
    }

    window.customElements.define(name, component, options);
    Cypress.log({
      name: 'define',
      message: [`<${name} ... />`],
    })
  });
});

let dispose: () => void;

function cleanup() {
  dispose?.();
}

export interface MountLitTemplateOptions {
  render: RenderOptions;
  log: boolean;
}

export type MountOptions = Partial<MountLitTemplateOptions>;

export function mount(
  component: Parameters<typeof render>[0],
  options: MountOptions = {}
) {
  const root = getContainerEl();
  render(component, root, options.render);

  dispose = () => {
    render(nothing, root);
  }

  return cy.wait(0, { log: false }).then(() => {
    if (options.log !== false) {
      Cypress.log({
        name: "mount",
        message: "Mounted component",
      });
    }
  });
}

setupHooks(cleanup);
