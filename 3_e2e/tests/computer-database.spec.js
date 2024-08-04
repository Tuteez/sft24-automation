import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { NewComputerPage } from "../pages/new-pc";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");

  await page.locator("#add").click();
  await page.locator("#name").fill("ABC PC");
  await page.locator("#introduced").fill("2000-01-05");
  await page.locator("#discontinued").fill("2000-01-06");
  await page.locator("#company").selectOption("OQO");
  await page.locator(".primary").click();

  await expect(page.locator(".alert-message")).toHaveText("Done !  Computer ABC PC has been created");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addNewComputer = new NewComputerPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addNewComputer.fillName("my pc");
  await addNewComputer.fillIntroduceDate("2020-02-08");
  await addNewComputer.fillDiscontinuedDate("2024-08-01");
  await addNewComputer.selectCompany("OQO");
  await addNewComputer.createComputer();

  await computersListPage.hasComputerBeenCreated("my pc");

});

test("Search doesn't match any records", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();
  await computersListPage.search("Nonexistant");
  await computersListPage.verifyNoData();

});

test("Search has 6 records", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();
  await computersListPage.search("ASCI");
  await computersListPage.verifyDataAmount(6);

});
