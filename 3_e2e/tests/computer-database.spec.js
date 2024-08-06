import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { newComputersListPage } from "../pages/create-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  //click add new pc
  await page.locator("#add").click(); 
  //fill name
  await page.locator("#name").fill("testavicius");
  //fill date1
  await page.locator("#introduced").fill("2024-01-01");
  //fill date2
  await page.locator("#discontinued").fill("2024-01-09");

  await page.locator("#company").selectOption("Nokia");

  await page.locator('input[type="submit"]').click();

  //alert-message warning
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await computersListPage.fillName("TESTAS");
  await computersListPage.fillIntroduced("2020-02-02");
  await computersListPage.fillDiscontinued("2020-02-03");
  await computersListPage.chooseCompany("Nokia");
  await computersListPage.clickDone();
});

test.describe("Task 4", async () => { 
//Task - 3: Create test to check computers list search feature when search result doesn’t match any records
test("Task 3: Test to check computers list search feature when search result doesnt match any records", async ({ page }) => {
  let newcomputersListPage = new newComputersListPage(page);

  await newcomputersListPage.goto();

  await newcomputersListPage.fillSearch("testastestas");

  await newcomputersListPage.clickFilter();

  await newcomputersListPage.checkResultsWhenNull("Nothing");
});


//only 1 result
test("Search finds at least 1 result", async ({ page }) => {
  let newcomputersListPage = new newComputersListPage(page);

  await newcomputersListPage.goto();

  await newcomputersListPage.fillSearch("Samsung");

  await newcomputersListPage.clickFilter();

  await newcomputersListPage.checkResultsTable(1);
});

//more than 1 result
test("Search finds more than 1 result", async ({ page }) => {
  let newcomputersListPage = new newComputersListPage(page);

  await newcomputersListPage.goto();

  await newcomputersListPage.fillSearch("Nokia");

  await newcomputersListPage.clickFilter();

  await newcomputersListPage.checkResultsTable(4);
});

});

test.describe("Task 5", async () => { 
  let newcomputersListPage;
  test.beforeEach(async ({page}) => {
    newcomputersListPage = new newComputersListPage(page);
    await newcomputersListPage.goto();
  });

  test("Search feature with null results", async () => {
  await newcomputersListPage.fillSearch("testtest");
  await newcomputersListPage.clickFilter();
  });

});

