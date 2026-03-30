import { faker } from '@faker-js/faker';
import { mainMenu, productsPage, checkoutPage } from '../../support/variables';
import { backpack as product } from '../../fixtures/products.json'

describe('Checkout page', () => {
    beforeEach(() => {
        cy.env(['standardUser']).then(({standardUser}) => {
            cy.login(standardUser.username, standardUser.password)
        })
    })

    afterEach(() => {
        cy.logout()
    })

    it('Add Sauce Labs Backpack to cart from product page and finish checkout process', () => {
        // checkout variables
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const postalCode = faker.location.zipCode()
        // variables for specific product test is working with
        const productQty = '1'
        const tax = 0.08
        const productTax = parseFloat((product.price * tax)).toFixed(2)
        const totalValue = (Number(product.price) + Number(productTax)).toFixed(2)

        // add product to cart
        cy.url().should('contain', productsPage.productsUrl)
        cy.addToCartByName(product.name)
        cy.getByDataTest(mainMenu.shoppingCartBadge).should('have.text', '1')

        // open cart and check item
        cy.getByDataTest(mainMenu.shoppingCartButton).click()
        cy.url().should('contain', checkoutPage.checkoutUrl)
        cy.getByDataTest(checkoutPage.product).should('have.length', 1)
        cy.getByDataTest(checkoutPage.productName).should('have.text', product.name)
        cy.getByDataTest(checkoutPage.productDescription).should('have.text', product.description)
        cy.getByDataTest(checkoutPage.productQty).should('have.text', productQty)
        cy.getByDataTest(checkoutPage.productPrice).should('have.text', `$${product.price}`)
        cy.getByDataTest(`${checkoutPage.removeFromCartButton}${product.removeButtonHandle}`).should('be.visible')

        // check cart navigation
        cy.getByDataTest(checkoutPage.continueShoppingButton).should('be.visible')
        cy.getByDataTest(checkoutPage.checkoutButton).should('be.visible')

        // continue to checkout step one
        cy.getByDataTest(checkoutPage.checkoutButton).click()
        cy.url().should('contain', checkoutPage.checkoutStepOneUrl)
        cy.getByDataTest(checkoutPage.checkoutFirstName).type(firstName)
        cy.getByDataTest(checkoutPage.checkoutLastName).type(lastName)
        cy.getByDataTest(checkoutPage.checkoutPostalCode).type(postalCode)

        // continue to checkout step two
        cy.getByDataTest(checkoutPage.checkoutStepOneContinueButton).click()
        cy.url().should('contain', checkoutPage.checkoutStepTwoUrl)
        cy.getByDataTest(checkoutPage.product).should('have.length', 1)
        cy.getByDataTest(checkoutPage.productName).should('have.text', product.name)
        cy.getByDataTest(checkoutPage.productDescription).should('have.text', product.description)
        cy.getByDataTest(checkoutPage.productQty).should('have.text', productQty)
        cy.getByDataTest(checkoutPage.productPrice).should('have.text', `$${product.price}`)
        cy.getByDataTest(checkoutPage.paymentInfoValue).should('contain', checkoutPage.paymentInfoValueText)
        cy.getByDataTest(checkoutPage.shippingInfoValue).should('have.text', checkoutPage.shippingInfoValueText)
        cy.getByDataTest(checkoutPage.subTotalValue).should('have.text', `Item total: $${product.price}`)
        cy.getByDataTest(checkoutPage.taxValue).should('have.text', `Tax: $${productTax}`)
        cy.getByDataTest(checkoutPage.totalValue).should('have.text', `Total: $${totalValue}`)
        cy.getByDataTest(checkoutPage.cancelButton).should('be.visible')

        // finish checkout
        cy.getByDataTest(checkoutPage.finishButton).click()
        cy.url().should('contain', checkoutPage.checkoutCompleteUrl)
        cy.getByDataTest(checkoutPage.ponyExpressLogo).should('be.visible')
        cy.getByDataTest(checkoutPage.checkoutCompleteHeader).should('have.text', checkoutPage.checkoutCompleteHeaderText)
        cy.getByDataTest(checkoutPage.checkoutCompleteDescription).should('have.text', checkoutPage.checkoutCompleteDescriptionText)

        // return back to products
        cy.getByDataTest(checkoutPage.backHomeButton).click()
        cy.url().should('contain', productsPage.productsUrl)
        cy.getByDataTest(productsPage.product).should('not.have.length', 0)
    })
})