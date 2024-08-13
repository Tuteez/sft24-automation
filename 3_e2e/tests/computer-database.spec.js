import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";

import { AddComputerName } from "../pages/add-computer-name-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");

  await page.locator("#add").click();
  await page.locator("#name").fill("my pc");
  await page.locator("#introduced").fill("2023-08-01");
  await page.locator("#discontinued").fill("2024-08-01");
  await page.locator("#company").selectOption("Apple Inc.");
  await page.locator("[value='Create this computer']").click();
  // tag[attribute='value']
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");
  // '.alert-message warning'
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addComputerName = new AddComputerName(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addComputerName.addComputerName("my pc");
});
  //Task 3:
  test("Search bar invalid data", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    await computersListPage.emptySearchList("labas");
    await computersListPage.noDataSearchList();
  
});
