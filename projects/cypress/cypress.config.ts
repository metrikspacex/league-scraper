import { defineConfig } from "cypress";

export default defineConfig({
  downloadsFolder: "./downloads",
  e2e: {
    specPattern: ["**/*.cy.ts", "**/*.cy.tsx"],
    setupNodeEvents(
      _on: Cypress.PluginEvents,
      _config: Cypress.PluginConfigOptions
    ) {},
  },
  fileServerFolder: ".",
  fixturesFolder: "./fixtures",
  port: 4200,
  screenshotsFolder: "./screenshots",
  supportFolder: "./support",
  videosFolder: "./videos",
});
