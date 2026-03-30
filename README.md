# Moxymind assignment in Cypress
This repository contains finished tests in Cypress.io for Technical task #1 and Technical task #2. Tests are implemented in Cypress.io and stored in separate folders `cypress/e2e/api` for API tests and `cypress/e2e/ui` for UI tests.
## How to run tests locally
1. **Clone repository**

2.  **Run npm install:**
```
npm install
```

3. **Add api keys and credentials**

API key and credentials for users are stored in `cypress.env.json`. For this example the file is included but in standard situation env should be included in .gitignore and never pushed to public repository.

4. **Run tests**
```
npm run test:open    // Opens cypress
npm run test:all     // Run both UI and API tests
npm run test:api     // Run all API tests
npm run test:ui      // Run all UI tests
```
## Folder structure
```project-root/
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   └── users.cy.js      # Technical task #2
│   │   └── ui/
│   │       ├── checkout.cy.js   # Technical task #1
│   │       ├── login.cy.js      # Technical task #1
│   │       └── products.cy.js   # Technical task #1
│   ├── fixtures/
│   │   ├── addUser.json
│   │   ├── addUsers.json
│   │   └── products.json
│   └── support/
│       ├── apiVariables.js
│       ├── commands.js
│       ├── e2e.js
│       └── variables.js
├── .gitignore
├── cypress.config.js
├── cypress.env.json
├── package-lock.json
├── package.json
└── README.md
```
## Tests explanation (Technical task #1)
### Login
#### Successful login
Core part of application(products) is hidden behind login. This test validates most crucial functionality for using the application. Without working login, the application is inacessible and all other tests fail.
#### Locked out user
This test verifies that application is accesible only to verified users and it effectively tests user permissions and that the systems prevents unauthorized interaction.
### Products
#### Open Sauce Labs Bike Light detail and add it to cart from detail
One of the main user flows for every eshop. This test verifies that products are linked to their detail page, the data(name, description, price) are correctly displayed and that the user is able to add product to cart from product detail. 
### Checkout
#### Add Sauce Labs Backpack to cart from product page and finish checkout process
This is the "Happy path" scenario for most important scenario in every eshop which is buying product. Test verifies whole checkout process:
1. Adding product to cart from products page
2. Opening the cart
3. Getting through multi-step checkout process
4. Placing the order
5. Returning back to homepage


