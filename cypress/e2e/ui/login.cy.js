import { loginPage, productsPage } from '../../support/variables'

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Successful login', () => {
    // login to page and check url is correct
    cy.env(['standardUser']).then(({standardUser}) => {
      cy.getByDataTest(loginPage.usernameInput).type(standardUser.username)
      cy.getByDataTest(loginPage.passwordInput).type(standardUser.password, {log: false})
    })
    cy.getByDataTest(loginPage.loginButton).click()
    cy.url().should('contain', productsPage.productsUrl)

    // check that user sees at least 1 product
    cy.getByDataTest(productsPage.product).should('not.have.length', 0)
    cy.logout()
  })
  it('Locked out user', () => {
    // login to page with locked user
    cy.env(['lockedUser']).then(({lockedUser}) => {
      cy.getByDataTest(loginPage.usernameInput).type(lockedUser.username)
      cy.getByDataTest(loginPage.passwordInput).type(lockedUser.password, {log: false})
    })
    cy.getByDataTest(loginPage.loginButton).click()

    // verify error message and not logging in
    cy.getByDataTest(loginPage.loginErrorMessageBanner).should('contain', loginPage.loginErrorMessage)
    cy.getByDataTest(loginPage.usernameInput).should('have.class', loginPage.inputErrorClass)
    cy.getByDataTest(loginPage.passwordInput).should('have.class', loginPage.inputErrorClass)
    cy.url().should('equal', `${Cypress.config().baseUrl}`)

    // close error message
    cy.getByDataTest(loginPage.closeLoginErrorMessage).click()
    cy.getByDataTest(loginPage.loginErrorMessageBanner).should('not.exist')
    cy.getByDataTest(loginPage.usernameInput).should('not.have.class', loginPage.inputErrorClass)
    cy.getByDataTest(loginPage.passwordInput).should('not.have.class', loginPage.inputErrorClass)
  })
})