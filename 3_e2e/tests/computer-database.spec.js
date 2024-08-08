import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddNewComputer, addNewComputer } from "../pages/Add-new-pc-page";
import { describe } from "node:test";
import { SearchResultPage } from "../pages/search-result-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator('#add').click();
  await page.locator('#name').fill('my pc');
  await page.locator('#introduced').fill('2020-11-11');
  await page.locator('#discontinued').fill('2023-10-10');
  await page.locator('#company').selectOption('IBM');
  await page.locator('.primary').click();
  await expect(page.locator('.alert-message')).toContainText('Done !');
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addNewComputer = new AddNewComputer(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await addNewComputer.fillName('naujausias');
  await addNewComputer.fillIntroduced('2020-10-10');
  await addNewComputer.fillDicscont('2024-01-01');
  await addNewComputer.fillCompany('IBM');
  await addNewComputer.clickSubmit();

  await computersListPage.sucessfullNewPC();
});

// Task - 3: Create test to check computers list search feature when search result doesn’t match any records

test("Search Box test - non existing", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let searchResultPage = new SearchResultPage(page);

  await computersListPage.goto();
  await computersListPage.fillSearchBox('KRISTINA');
  await computersListPage.clickSubmitSearch();
  await computersListPage.noMatchingRecCheck();
});

//Task - 4: Add at least two more tests for searching feature and move them all to same group (describe)

test.describe("testing search box functions", async () =>{
  let computersListPage = new ComputersListPage(page);
  let searchResultPage = new SearchResultPage(page);
  test("Search Box test - non existing", async ({ page }) => {
    await computersListPage.goto();
    await computersListPage.fillSearchBox('KRISTINA');
    await computersListPage.clickSubmitSearch();
    await computersListPage.noMatchingRecCheck();
  });
  test("Search Box test - 1 result", async ({ page }) =>{ 
    await computersListPage.goto();
    await computersListPage.fillSearchBox('Acer Extensa 5220');
    await computersListPage.clickSubmitSearch();
    await searchResultPage.countSearchResults(1);}
  )
  test("Search Box test - 2 result", async ({ page }) =>{ 
    await computersListPage.goto();
    await computersListPage.fillSearchBox('Acer Extensa');
    await computersListPage.clickSubmitSearch();
    await searchResultPage.countSearchResults(2);}
  )
  })

  // Task 5: Introducing beforeEach

  