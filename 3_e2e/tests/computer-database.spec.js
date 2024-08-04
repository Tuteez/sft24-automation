import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
});
