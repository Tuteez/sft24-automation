import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddNewComputerPage } from "../pages/add-new-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  // add new pc
  await page.locator("#add").click();
  // fill name
  await page.locator("#name").fill("Matas");
  // fill introduced
  await page.locator("#introduced").fill("2024-07-31");
  // fill discontinued
  await page.locator("#discontinued").fill("2024-07-31");
  // select
  await page.locator("#company").selectOption({ label: "RCA" });
  // click create
  await page.locator('input[type="submit"]').click();
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  let addNewComputerPage = new AddNewComputerPage(page);
  await addNewComputerPage.fillForm();
});

// Task 6

test.describe("Test Search Feature", async () => {
  let searchQueries = [
    { Query: "wasddadafeaerg", ResultCount: 0 },
    { Query: "ASCI Red", ResultCount: 1 },
    { Query: "ASCI Blue", ResultCount: 2 },
  ];
  let computersListPage;
  test.beforeEach(async ({ page }) => {
    computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  });
  test("Test search feature parametrization", async () => {
    searchQueries.forEach(async (searchQuery) => {
      await computersListPage.searchFilter(searchQuery.Query);
    });
  });
});
