describe('Testing Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Contains Introduction', () => {
    cy.getDataTest("introduction").contains("Welcome to Commander’s Gambit!")
  })
  it("Traverse Entire App", () => {
    cy.getDataTest_Type("select-num-of-players", "2")
    
    cy.getDataTest_Click("main-page-button")
    cy.intercept('GET', '**/search*').as('getCommanders') // You can use cy.intercept to return what you want.
    cy.getDataTest_Type("search-commander", "Aang")

    cy.wait('@getCommanders')

    cy.getDataTest_Click("Aang, Airbending Master")
    cy.getDataTest_Click("Aang, the Last Airbender") // Click on Aang

    cy.getDataTest_Type("search-commander", "Sokka")
    cy.getDataTest_Click("Sokka, Swordmaster") // Click on Sokka
    cy.getDataTest_Click("Sokka and Suki") // Click on Sokka
    cy.getDataTest_Click("Sokka, Bold Boomeranger") // Click on Sokka
    cy.getDataTest_Click("Sokka, Wolf Cove\'s Protector") // Click on Sokka

    cy.getDataTest_Type("search-commander", "Katara")
    cy.getDataTest_Click("Katara, Bending Prodigy") // Click on Katara
    cy.getDataTest_Click("Katara, Heroic Healer") // Click on Katara
    cy.getDataTest_Click("Katara, Seeking Revenge") // Click on Katara
    cy.getDataTest_Click("Katara, the Fearless") // Click on Katara
    cy.getDataTest_Click("Katara, Waterbending Master") // Click on Katara
    cy.getDataTest_Click("Katara, Water Tribe's Hope") // Click on Katara

    cy.getDataTest_Type("search-commander", "Zuko")
    cy.getDataTest_Click("Zuko, Avatar Hunter") // Click on Zuko
    cy.getDataTest_Click("Zuko, Conflicted") // Click on Zuko
    cy.getDataTest_Click("Zuko, Exiled Prince") // Click on Zuko
    cy.getDataTest_Click("Zuko, Firebending Master") // Click on Zuko
    cy.getDataTest_Click("Zuko, Seeking Honor") // Click on Zuko

    cy.getDataTest_Type("search-commander", "Bello")
    cy.getDataTest_Click("Bello, Bard of the Brambles")

    cy.getDataTest_Click("search-page-button")  // Finish selecting commanders for player 1

    //Player 2 Selecting Commanders
    cy.getDataTest_Type("search-commander", "Doctor")
    cy.getDataTest_Click("The First Doctor") // Click on Doctor
    cy.getDataTest_Click("The Second Doctor") // Click on Doctor
    cy.getDataTest_Click("The Third Doctor") // Click on Doctor
    cy.getDataTest_Click("The Fourth Doctor") // Click on Doctor
    cy.getDataTest_Click("The Fifth Doctor") // Click on Doctor
    cy.getDataTest_Click("The Sixth Doctor") // Click on Doctor
    cy.getDataTest_Click("The Seventh Doctor") // Click on Doctor
    cy.getDataTest_Click("The Eighth Doctor") // Click on Doctor
    cy.getDataTest_Click("The Ninth Doctor") // Click on Doctor
    cy.getDataTest_Click("The Tenth Doctor") // Click on Doctor
    cy.getDataTest_Click("The Eleventh Doctor") // Click on Doctor
    cy.getDataTest_Click("The Twelfth Doctor") // Click on Doctor
    cy.getDataTest_Click("search-page-button")

    //Check to make sure we're on the last page
    cy.contains("Randomize")
    cy.url('include', '\\randomize')
  })
})
