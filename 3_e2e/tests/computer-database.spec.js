import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddComputerPage } from "../pages/add-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator("#add").click();
  await page.locator("#name").fill("my pc");
  await page.locator("#introduced").fill("2023-08-01");
  await page.locator("#discontinued").fill("2024-08-01");
  await page.locator("#company").selectOption("RCA");
  await page.locator('[value="Create this computer"]').click();
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");
}); //tag [attribute='value']

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addComputerName = new AddComputerPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addComputerName.addComputerName("my pc");
});

// Task - 3: Create test to check computers list search feature when search result doesn’t match any records

test("Check computer list search empty search result", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();
  await computersListPage.emptySearchList("Legenda");
  await computersListPage.emptySearchListConfirmation();
});

