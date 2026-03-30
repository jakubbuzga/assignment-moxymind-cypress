import { productsPage, mainMenu } from '../../support/variables';
import { bikeLight as product } from '../../fixtures/products.json'

describe('Products page', () => {
    beforeEach(() => {
        cy.env(['standardUser']).then(({standardUser}) => {
            cy.login(standardUser.username, standardUser.password)
        })
    })

    afterEach(() => {
        cy.logout()
    })

    it('Open Sauce Labs Bike Light detail and add it to cart from detail', () => {
        // open product details
        cy.url().should('contain', productsPage.productsUrl)
        cy.getByDataTest(productsPage.productName).contains(product.name).click()
        cy.url().should('contain', `id=${product.id}`)

        // check product data
        cy.getByDataTest(productsPage.detailProductName).should('have.text', product.name)
        cy.getByDataTest(productsPage.detailProductDescription).should('have.text', product.description)
        cy.getByDataTest(productsPage.detailProductPrice).should('have.text', `$${product.price}`)

        // add to cart
        cy.getByDataTest(productsPage.detailAddToCartButton).click()
        cy.getByDataTest(productsPage.detailRemoveFromCartButton).should('be.visible')
        cy.getByDataTest(mainMenu.shoppingCartBadge).should('have.text', '1')
    })
})