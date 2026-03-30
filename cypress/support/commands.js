import 'cypress-ajv-schema-validator';
import { loginPage, mainMenu, productsPage } from './variables';

// Commands
Cypress.Commands.add('getByDataTest', (selector) => {
    return cy.get(`[data-test="${selector}"]`)
})
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/')
    cy.getByDataTest(loginPage.usernameInput).type(username)
    cy.getByDataTest(loginPage.passwordInput).type(password)
    cy.getByDataTest(loginPage.loginButton).click()
})
Cypress.Commands.add('resetAppState', () => {
    cy.getByDataTest(mainMenu.resetPageStateButton).click()
})
Cypress.Commands.add('logout', () => {
    cy.getByDataTest(mainMenu.menuButton).parent().click()
    cy.resetAppState()
    cy.getByDataTest(mainMenu.logoutButton).click()
    cy.url().should('equal', `${Cypress.config().baseUrl}`)
})
Cypress.Commands.add('addToCartByName', (productName) => {
    cy.contains(`[data-test="${productsPage.product}"]`, productName).find('button').click()
})