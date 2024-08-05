import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { ComputersCreatePage } from "../pages/computer-create-page";
// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  //click add new pc
  await page.locator('#add').click();

 
  await expect(page.locator('#main h1')).toHaveText('Add a computer');
  await page.locator('#name').fill('my computer');

  await page.locator('#introduced').fill('2022-04-05');
  
  await page.locator('#discontinued').fill('2023-04-05');
 
  await page.locator('#company').selectOption("Sony");
 
   await page.locator('input[type=submit]').click();
  await expect(page.locator(".alert-message")).toContainText("Done");
});  

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let computersCreatePage  = new ComputersCreatePage (page);


  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  
  await computersCreatePage.fillComputerData() 
  await computersCreatePage.createThisComputer()
});

//Create test to check computers list search feature when search result doesn' match

test("Verify seach feature with no data", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto()
  await computersListPage.searchBy()
  await computersListPage.verifyNoData()

})

// Add 2 more  tests to for searching feature and move them all to the same group 
test("Task 4 verify seach feature", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto()
  await computersListPage.searchBy()
  await computersListPage.verifyNoData()
})