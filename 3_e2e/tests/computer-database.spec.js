import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator("#add").click();
  await page.locator("#name").fill('PC');
  await page.locator("#introduced").fill("2010-06-18");
  await page.locator("#discontinued").fill("2020-06-18");
  await page.locator("#introduced").fill("2010-06-18");
  await page.locator("#company").selectOption("ASUS");
  await page.locator('input[type="submit"]').click();
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
});

//Task -2


