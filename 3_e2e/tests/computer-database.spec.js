import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddComputerPage } from "../pages/add-computer-page";

// Task - 1: Update existing test to verify computer creation workflow
test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");

  // Click on a button "Add a new computer"
  await page.locator("#add").click();
  await expect(page.locator("#main h1")).toHaveText("Add a computer");
  // Fill Computer Name
  await page.locator("#name").fill("Test");
  // Fill Introduced date
  await page.locator("#introduced").fill("2024-07-31");
  // Fill Discontinued date
  await page.locator("#discontinued").fill("2024-08-01");
  // Choose  Company
  await page.locator("#company").selectOption("Nintendo");
  // Click on a button "Create this computer"
  await page.locator('input[type="submit"]').click();

});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addComputerPage = new AddComputerPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await addComputerPage.fillComputerName("Test Second");
  await addComputerPage.fillIntroducedDate("2024-07-31");
  await addComputerPage.fillDiscontinuedDate("2024-08-01");
  await addComputerPage.chooseCompany("ASUS");
  await addComputerPage.createNewComputer();
});

//Task - 3: Create test to check computers list search feature when search result doesn’t match any records
test("Verify search feature when no data", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();
  await computersListPage.seachBy("noMatch");
  await computersListPage.verifyNoData();
});

//Task - 4: Add at least two more tests for searching feature and move them all to same group (describe)
test.describe("Task 4: Verify search feature", async () => {
  test("Verify search feature when no data", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    await computersListPage.seachBy("noMatch");
    await computersListPage.verifyNoData();
  });
  test("Verify search feature with one match", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    await computersListPage.seachBy("ASCI Red");
    await computersListPage.verifyItemsCountInTable(1);
  });
  test("Verify search feature with two matches", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    await computersListPage.seachBy("ASCI Blue");
    await computersListPage.verifyItemsCountInTable(2);
  });
});

//Task - 5: Introduce setup method (beforeEach) from previously created tests group
test.describe("Verify search feature with setup (beforeEach)", async () => {
  let computersListPage;

  test.beforeEach(async ({ page }) => {
    computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  });

  test("Verify search feature when no data", async () => {
    await computersListPage.seachBy("noMatch");
    await computersListPage.verifyNoData();
  });
  test("Verify search feature with one match", async () => {
    await computersListPage.seachBy("ASCI Red");
    await computersListPage.verifyItemsCountInTable(1);
  });
  test("Verify search feature with two matches", async () => {
    await computersListPage.seachBy("ASCI Blue");
    await computersListPage.verifyItemsCountInTable(2);
  });
});

//--OPTIONAL

//Task - 6: Rearrange previously created tests group to use parametrization
test.describe("Verify search feature with parametrization", async () => {
  let searchCriterias = [
    {
      searchBy: "NoMatch",
      resultCount: 0,
    },
    {
      searchBy: "ASCI Red",
      resultCount: 1,
    },
    {
      searchBy: "ASCI Blue",
      resultCount: 2,
    }
  ];

  searchCriterias.forEach((searchCriteria) => {
    test(`Verify `)
  });
});
//Task - 7: Create object from values used in initial computer creation test 
//Task - 8: Introduce test data object instead of hardcoded values
