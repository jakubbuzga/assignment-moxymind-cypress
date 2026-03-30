import addUser from '../../fixtures/addUser.json'
import addUsers from '../../fixtures/addUsers.json'
import { usersEndpoint } from '../../support/apiVariables'
const apiUrl = Cypress.env('apiUrl')

describe('Api tests for /users endpoint', () => {
    // Test Case 1 – GET - List Users
    it('Get list of users for page no. 2', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}/users`,
            qs: {
                page: 2
            },
            headers: {
                'x-api-key': `${Cypress.env('apiKey')}`
            }
        }).then((response) => {
            // http code and total
            expect(response.status).to.eq(200)
            expect(response.body.total).to.eq(12)
            // last name for first and second user
            expect(response.body.data[0].last_name).to.eq('Lawson')
            expect(response.body.data[1].last_name).to.eq('Ferguson')
            // verify pagination
            expect(response.body.data.length).to.be.lessThan(response.body.total)
            expect(response.body.data.length).to.eq(response.body.per_page)
            // Bonus - verify data types
            expect(response.body.page).to.be.a('number')
            expect(response.body.per_page).to.be.a('number')
            expect(response.body.total).to.be.a('number')
            expect(response.body.total_pages).to.be.a('number')
            expect(response.body.data).to.be.a('array')
        })
    })
    // Test Case 2 – POST – Create
    it('Create new user', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/users`,
            headers: {
                'x-api-key': `${Cypress.env('apiKey')}`
            },
            body: addUser
        }).then((response) => {
            // http code and duration
            expect(response.status).to.eq(201)
            expect(response.duration).to.be.lessThan(200)
            // id and timestamp
            expect(response.body.id).to.be.a('string')
            expect(response.body.createdAt).to.be.a('string').and.match(usersEndpoint.iso8601Regex) // Check if createdAt match Regex for ISO8601
            // name and job
            expect(response.body.name).to.eq(addUser.name)
            expect(response.body.job).to.eq(addUser.job)
            // Bonus - validate schema using ajv
            cy.wrap(response).validateSchema(usersEndpoint.jsonSchemaAddUser)
        })
    })
    // Bonus - Running multiple api calls for user from fixture file
    addUsers.forEach((user) => {
        it(`Bonus - Create new user with name: ${user.name} and job: ${user.job}`, () => {
            cy.request({
                method: 'POST',
                url: `${apiUrl}/users`,
                headers: {
                    'x-api-key': `${Cypress.env('apiKey')}`
                },
                body: user
            }).then((response) => {
                // http code and duration
                expect(response.status).to.eq(201)
                expect(response.duration).to.be.lessThan(200)
                // id and timestamp
                expect(response.body.id).to.be.a('string')
                expect(response.body.createdAt).to.be.a('string').and.match(usersEndpoint.iso8601Regex) // Check if createdAt match Regex for ISO8601
                // name and job
                expect(response.body.name).to.eq(user.name)
                expect(response.body.job).to.eq(user.job)
                // Bonus - validate schema using ajv
                cy.wrap(response).validateSchema(usersEndpoint.jsonSchemaAddUser)
            })
        })
    })
})