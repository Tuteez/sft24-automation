import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  //click add new pc
  await page.locator("#add").click();
  await page.locator("#name").fill("abc");
  await page.locator("#introduced").fill("2023-09-09");
  await page.locator("#discontinued").fill("2023-09-19");
  await page.locator("#company").selectOption("Nokia");
  await page.locator('input[type="submit"]').click();
  await expect(page.locator(".alert-message")).toContainText("Done");


});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  
  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await computersListPage.AddNewComputer("abc","2019-10-12","2020-12-12","RCA");

});

//Task - 3 : Create test to check computers list search feature when search result doesn’t match any records

test("Task 3: check search feature non-existent name", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  
  await computersListPage.goto();
  await computersListPage.verifySearchNA('NonExistentComputer');

});
//Task - 4 : Add at least two more tests for searching feature and move them all to same group (describe)

test("Task 4: check search feature non-existent name", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  
  await computersListPage.goto();
  await computersListPage.verifySearch('ASCI Red');

});

