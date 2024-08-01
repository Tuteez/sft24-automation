import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { CreateComputersPage } from "../pages/create-computers-page";
import { ComputersListCheckPage } from "../pages/computer-list-check";

// Task 5 : Introduce setup method (beforeEach) from previously created tests group
test.beforeEach(async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto("https://computer-database.gatling.io/computers", "Computers database");
})

// Task - 1: Update existing test to verify computer creation workflow
test("Create new computer", async ({ page }) => {  
  //click add new pc
  await page.locator("#add").click();
  //fill name, date..
  await page.locator("#name").fill("TestinisKompas");
  await page.locator("#introduced").fill("2023-07-31");
  await page.locator("#discontinued").fill("2024-07-31");
  await page.locator("#company").selectOption("Sony");
  //click create computer
  await page.locator('input[type="submit"]').click();
  //verify msg
  await expect(page.locator("#main > div.alert-message.warning > strong")).toHaveText("Done !  ");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.openNewComputerCreationPage("#add");

  let createComputersPage = new CreateComputersPage(page);
  await createComputersPage.fillComputerName("#name", "TestinisKompas");
  await createComputersPage.fillComputerIntroducedDate("#introduced", "2023-07-31");
  await createComputersPage.fillComputerdDscontinuedDate("#discontinued", "2024-07-31");
  await createComputersPage.selectComputerCompany("#company", "Sony");
  await createComputersPage.registerCreatedComputer('input[type="submit"]');
});

// Task 3: Create test to check computers list search feature when search result doesn’t match any records
test("Computer list check - no match", async ({ page }) => {
  let createListCheckPage = new ComputersListCheckPage(page);
  await createListCheckPage.searchForRecord("Nera");
  await createListCheckPage.verifySearchFailed("Nothing to display");
});
// Task 4 : Add at least two more tests for searching feature and move them all to same group (describe)
test("Computer list check - succesfull 1 match", async ({ page }) => {
  let createListCheckPage = new ComputersListCheckPage(page);
  await createListCheckPage.searchInComputerListNotFound("Pilot ACE");
  await createListCheckPage.verifySearchSuccessfull1("Pilot ACE") ;
});
test("Computer list check - succesfull 2 matches", async ({ page }) => {
  let createListCheckPage = new ComputersListCheckPage(page);
  await createListCheckPage.searchInComputerListNotFound("Acer Extensa");
  await createListCheckPage.verifySearchSuccessfull2("Acer Extensa");
});