import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddNewComputerPage } from "../pages/add-new-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#add").click()
  await page.locator('#name').fill('my pc');
  await page.locator('#introduced').fill('1990-09-18');
  await page.locator('#discontinued').fill('2000-09-18');
  await page.locator('#company').selectOption('Apple Inc.');
  await page.locator('input[type="submit"]').click();
  await expect(page).toHaveTitle("Computers database");
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addNewComputerPage = new AddNewComputerPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addNewComputerPage.fillName('My new pc');
  await addNewComputerPage.fillIntroducedDate('1999-07-27');
  await addNewComputerPage.fillDiscontinuedDate('2001-08-10');
  await addNewComputerPage.selectCompany('Apple Inc.');
  await addNewComputerPage.clickCreateThisComputer();
  await expect(page).toHaveTitle("Computers database");
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");

});

test("Computer Search List", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();
  await computersListPage.fillSearchInput('Aple');
  await computersListPage.clickFilterByName();
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");

});