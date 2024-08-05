import { test, expect } from "@playwright/test";
import { AddComputerPage } from "../pages/add-computer-page";
import { ComputersListPage } from "../pages/computers-list-page";

// Task - 1: Update existing test to verify computer creation workflow
test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#add").click();
  await page.locator("#name").fill("my pc");
  await page.locator("#introduced"). fill("2024-08-09");
  await page.locator("#discontinued").fill("2024-08-18");
  await page.locator("#company").selectOption("RCA");
  await page.locator("[value='Create this computer']").click();
  await expect(page.locator(".alert-message.warning")).toContainText("Done");
  await expect(page).toHaveTitle("Computers database");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addComputerPage = new AddComputerPage(page);
  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addComputerPage.fillComputerName("my pc");
  await addComputerPage.fillIntroduced("2024-08-09");
  await addComputerPage.fillDiscontinued("2024-08-18");
  await addComputerPage.selectCompany("RCA");
  await addComputerPage.clickAddThisComputer();
  await computersListPage.comfirmMessage();

});
//Task 3:
test("Verify search feature when no data", async ({page}) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#searchbox").fill("lina");
  await page.locator("#searchsubmit").click();
  await expect(page.locator(".well")).toContainText("Nothing to display");
});

//Task 4:
test.describe("Task 4: Verify search feature", async () => {
  
test("Verify search feature when no data", async ({page}) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#searchbox").fill("lina");
  await page.locator("#searchsubmit").click();
  await expect(page.locator(".well")).toContainText("Nothing to display");
});

test("Verify search feature when no data-", async ({page}) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#searchbox").fill("lina");
  await page.locator("#searchsubmit").click();
  await expect(page.locator(".well")).toContainText("Nothing to display");
});
});
