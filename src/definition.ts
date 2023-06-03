import { defineComponentFramework } from 'cypress'

const dep: Cypress.CypressComponentDependency = {
  type: 'lit',
  name: 'Lit',
  package: 'lit',
  installer: 'lit',
  description: "Lit is a simple library for building fast, lightweight web components.",
  minVersion: '^2.0.0'
};

export default defineComponentFramework({
  type: 'cypress-ct-lit',
  name: 'Lit',
  supportedBundlers: ['vite', 'webpack'],
  detectors: [dep],
  dependencies: () => {
    return [dep]
  },
  icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200"><path fill="#00e8ff" d="M40 120l20-60l90 90l-30 50l-40-40h-20"/><path fill="#283198" d="M80 160v-80l40-40v80M0 160l40 40l20-40l-20-40h-20"/><path fill="#324fff" d="M40 120v-80l40-40v80M120 200v-80l40-40v80M0 160v-80l40 40"/><path fill="#0ff" d="M40 200v-80l40 40"/></svg>'
})

