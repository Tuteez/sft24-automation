import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { NewComputerCreationPage } from "../pages/new-computer-creation-page";


// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator("#add").click();

  //set name 
  await page.locator("#name").fill("My name");
  //set date 
  await page.locator("#introduced").fill("1989-12-12");
   //set Discontinued 
   await page.locator("#discontinued").fill("1990-01-10");
   // set Company 
   await page.locator("#company").selectOption("Sony");
   await page.locator(".btn.primary").click();

   await expect(page.locator(".alert-message")).toContainText("Done !");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let newComputerCreationPage = new NewComputerCreationPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await newComputerCreationPage.fillComputerName("My name");
  await newComputerCreationPage.fillComputerDateIntroduced("1989-12-12");
  await newComputerCreationPage.fillComputerDateDiscontinued("1990-01-10");
  await newComputerCreationPage.fillComputerCompany("Sony");
  await newComputerCreationPage.clickButton();
  await computersListPage.checkMessage("Done !");
})

//Task - 3: Create test to check computers list search feature when search result doesn’t match any records
test("Verify search feature when no data", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();

  await computersListPage.searchBy("search text");
  await computersListPage.noResultsFound("Nothing to display");  
});

//Task 4 - Add at least two more tests for searching feature and move them all to same group (describe)


test.describe("Task 4: Verify search feature", async () => {
  test("Verifysearch feature fwith one match", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  
    await computersListPage.searchBy("ASCI red");


   await computersListPage.checkItemsCount(1);  
  });
  test("Verify search feature with two match", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  
    await computersListPage.searchBy("ASCI blue");

    await computersListPage.checkItemsCount(2);  
  });
});

//5 - Introduce setup method (beforeEach) from previously created tests group
test.describe("Task 5: beforeEach", async () => {
  let computersListPage;
  test.beforeEach(async({page})=>{
    computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  });

  test("Verifysearch feature fwith one match", async ({ page }) => {
    await computersListPage.searchBy("ASCI red");
    await computersListPage.checkItemsCount(1);  
  });
  test("Verify search feature with two match", async ({ page }) => {
    await computersListPage.searchBy("ASCI blue");
    await computersListPage.checkItemsCount(2);  
  });
});