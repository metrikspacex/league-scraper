import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    downloadsFolder: "./downloads",
    fixturesFolder: "./fixtures/",
    screenshotsFolder: "./screenshots",
    specPattern: ["**/*.cy.ts"],
    supportFolder: "./support/",
    videosFolder: "./videos",
  },
});
