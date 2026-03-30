const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    "apiUrl": "https://reqres.in/api",
  },
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
});
