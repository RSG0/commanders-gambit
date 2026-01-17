describe('Testing Functionality', () => {
  it('Contains Introduction', () => {
    cy.visit('/') // Get to page
    cy.get('[data-test="introduction"]').contains("Welcome to Commander’s Gambit!") // Check if Test exists    
  })
  it.only("Navigate to Next Page (2 Players)", () => {
    cy.visit('/')
    cy.get('[data-test="select-num-of-players"]').clear()
    cy.get('[data-test="select-num-of-players"]').type("2") // 2 players
    cy.get('[data-test="main-page-button"]', {timeout: 10000}).click()
    //Player 1 Selecting Commanders
    cy.get('[data-test="search-commander"]').type("Aang")
    cy.get('[data-test="Aang, Airbending Master"]').click() // Click on Aang
    cy.get('[data-test="Aang, the Last Airbender"]').click() // Click on Aang
    cy.get('[data-test="search-commander"]').clear()
    cy.get('[data-test="search-commander"]').type("Sokka")
    cy.get('[data-test="Sokka, Swordmaster"]').click() // Click on Sokka
    cy.get('[data-test="Sokka and Suki"]').click() // Click on Sokka
    cy.get('[data-test="Sokka, Bold Boomeranger"]').click() // Click on Sokka
    cy.get('[data-test="Sokka, Wolf Cove\'s Protector"]').click() // Click on Sokka

    cy.get('[data-test="search-commander"]').clear()
    cy.get('[data-test="search-commander"]').type("Zuko")
    cy.get('[data-test="Zuko, Avatar Hunter"]').click() // Click on Zuko
    cy.get('[data-test="Zuko, Conflicted"]').click() // Click on Zuko
    cy.get('[data-test="Zuko, Exiled Prince"]').click() // Click on Zuko
    cy.get('[data-test="Zuko, Firebending Master"]').click() // Click on Zuko


    cy.get('[data-test="search-page-button"]').click()
    //Player 2 Selecting Commanders
    cy.get('[data-test="search-commander"]').type("Doctor")
    cy.get('[data-test="The First Doctor"]').click() // Click on Doctor
    cy.get('[data-test="The Second Doctor"]').click() // Click on Doctor
    cy.get('[data-test="The Third Doctor"]').click() // Click on Doctor
    cy.get('[data-test="The Fourth Doctor"]').click() // Click on Doctor
    cy.get('[data-test="The Fifth Doctor"]').click() // Click on Doctor
    cy.get('[data-test="The Sixth Doctor"]').click() // Click on Doctor
    cy.get('[data-test="The Seventh Doctor"]').click() // Click on Doctor
    cy.get('[data-test="The Eighth Doctor"]').click() // Click on Doctor
    cy.get('[data-test="search-page-button"]').click()
  })
})
