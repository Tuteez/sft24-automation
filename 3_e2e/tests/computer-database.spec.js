import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddComputerPage } from "../pages/add-computer-page";

// Task - 1: Update existing test to verify computer creation workflow
test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");

   await page.locator("#add").click();
   await page.locator("#name").fill("my CP");
   await page.locator("#introduced").fill("2024-08-01");
   await page.locator("#discontinued").fill("2025-05-05");
   await page.locator("#company").selectOption("Thinking Machines");
   await page.locator("[value='Create this computer']").click();
   await expect(page.locator("div.alert-message.warning")).toContainText("Done");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addComputerPage = new AddComputerPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await addComputerPage.fillComputerName("my PC");
  await addComputerPage.fillIntroduced("2024-08-01");
  await addComputerPage.fillDiscontinued("2025-08-01");
  await addComputerPage.selectCompany("Thinking Machines");
  await addComputerPage.clickAddThisComputer();
  await expect(page.locator("div.alert-message.warning")).toContainText("Done")
});

//Task - 3: Create test to check computers list search feature when search result doesn’t match any records
test("Test search when no match found", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.fillSearchBox("Match");
  await computersListPage.clickSearch();
  await expect(page.locator("div.well")).toContainText("Nothing to display")
});

//Task - 4: Add at least two more tests for searching feature and move them all to same group (describe)
test.describe("Search tests", () => {
  test("Test search when no match found", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    await computersListPage.fillSearchBox("Match");
    await computersListPage.clickSearch();
    await expect(page.locator("div.well")).toContainText("Nothing to display")
  });

  test("Test search when two matches found", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    await computersListPage.fillSearchBox("Acer Extensa");
    await computersListPage.clickSearch();
    await expect(page.locator("#pagination")).toContainText("of 2");
  });

  test("Test search when one match found", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    await computersListPage.fillSearchBox("Acer Extensa 5220");
    await computersListPage.clickSearch();
    await expect(page.locator("#pagination")).toContainText("of 1");
  });

});
