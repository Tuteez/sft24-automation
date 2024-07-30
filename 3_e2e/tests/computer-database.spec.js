import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { NewComputerCreationPage } from "../pages/new-computer-creation-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator("#add").click();
  await page.locator("#name").fill("Piotr");
  await page.locator("#introduced").fill("2000-10-10");
  await page.locator("#discontinued").fill("2010-11-11");
  await page.locator("#company").selectOption("RCA");
  await page.locator('input[type="submit"][value="Create this computer"]').click();
  await expect(page.locator(".alert-message.warning")).toContainText("Done");

});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let newComputerCreationPage = new NewComputerCreationPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await newComputerCreationPage.fillComputerName("My PC");
  await newComputerCreationPage.fillComputerIntroduced("2000-10-10");
  await newComputerCreationPage.fillComputerDiscontinued("2010-11-11");
  await newComputerCreationPage.fillComputerCompany("RCA");
  await newComputerCreationPage.createComputer();
  await computersListPage.checkSuccessMessage();

});

//Task 3 - Create test to check computers list search feature when search result doesn’t match any records
test("Verify search feature when no data", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.searchBy("abc");
  await computersListPage.verifyNoItemsFound();

});

//Task 4 - Add at least two more tests for searching feature and move them all to same group (describe)
test.describe("searching features tests", () => {
  test("Verify search feature when no data", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
    await computersListPage.searchBy("abc");
    await computersListPage.verifyNoItemsFound();
  
  });

  test("Verify search feature with one match", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
    await computersListPage.searchBy("ASCI red");
    await computersListPage.checkItemsCount(1);
  
  });

  test("Verify search feature with two matches", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
    await computersListPage.searchBy("ASCI blue");
    await computersListPage.checkItemsCount(2);
  
  });

});

//Task 5 - Introduce setup method (beforeEach) from previously created tests group
test.describe("Setup (beforeEach) from previous tests", () => {
  
  let computersListPage;
  test.beforeEach(async ({ page }) =>{
    computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  });
  test("Verify search feature when no data", async ({ page }) => {
  
    await computersListPage.searchBy("abc");
    await computersListPage.verifyNoItemsFound();
  
  });

  test("Verify search feature with one match", async ({ page }) => {
  
    await computersListPage.searchBy("ASCI red");
    await computersListPage.checkItemsCount(1);
  
  });

  test("Verify search feature with two matches", async ({ page }) => {
  
    await computersListPage.searchBy("ASCI blue");
    await computersListPage.checkItemsCount(2);
  
  });

});
