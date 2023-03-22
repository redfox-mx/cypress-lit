import { defineComponentFramework } from "cypress";

const dep: Cypress.CypressComponentDependency = {
  type: "lit",
  name: "Lit",
  package: "lit",
  installer: "lit",
  description: "Lit is a simple library for building fast, lightweight web components.",
  minVersion: "^2.0.0",
};

export default defineComponentFramework({
  type: "cypress-ct-lit",
  name: "Lit",
  supportedBundlers: ["vite", "webpack"],
  detectors: [dep],
  dependencies: () => {
    return [dep];
  },
});
