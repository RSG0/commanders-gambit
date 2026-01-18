// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getDataTest', (dataName) => {
    return cy.get(`[data-test="${dataName}"]`)  // need to use quotes for dataName because some test data might have spaces
})
Cypress.Commands.add('getDataTest_Click', (dataName) => {
    return cy.get(`[data-test="${dataName}"]`).should('be.visible').click()
})
Cypress.Commands.add('getDataTest_Type', (dataName, text) => {
    return cy.get(`[data-test="${dataName}"]`).clear().type(text)
})