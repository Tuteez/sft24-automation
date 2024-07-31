import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddNewComputer } from "../pages/add-a-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

/*
test("Create new computer", async ({ page }) => {

  let errorMessage = "Done !  Computer New Computer has been created";

  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");

  //click add new pc
  await page.locator("#add").click(); //# = id

  //fill name fields
  await page.locator("#name").fill("New Computer");

  //fill introduction data field
  await page.locator("#introduced").fill("2000-01-01");

  //fill discontinuation data field
  await page.locator("#discontinued").fill("2010-01-01");
  
  //select company
  await page.locator("#company").selectOption("Nokia");
 
  //click submit button
  await page.locator('input[type="submit"]').click();

  //assert correct response
  await expect(page.locator(".alert-message")).toHaveText(errorMessage); //arba .toContainText("Done")


});
*/

//Task - 2: Update existing test to verify computer creation workflow with POM

test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addNewComputer = new AddNewComputer(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await addNewComputer.fillName("New Computer");
  await addNewComputer.fillIntroductionDate("2000-01-01");
  await addNewComputer.fillDiscontinuationDate("2010-01-01");
  await addNewComputer.selectCompanyName("Nokia");
  await addNewComputer.submitNewComputer();

  await expect(page.locator(".alert-message")).toContainText("Done");
});

//Task - 3
test("Verify search feature with no matches", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  //open page
  await computersListPage.goto();
  //search invalid name
  await computersListPage.searchBy("noMatch");
  //click "filter by name"
  await computersListPage.clickFilter();
  //assert table displays 1 object
  await computersListPage.verifyItemsCountInTable(0);
});

//Task - 4
test.describe("Task 4: verify search feature", async () => {
  
  test("Verify search feature with no matches", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);

    //open page
    await computersListPage.goto();
    //search invalid name
    await computersListPage.searchBy("noMatch");
    //click "filter by name"
    await computersListPage.clickFilter();
    //assert table displays 1 object
    await computersListPage.verifyItemsCountInTable(0);
  });
  

  test("Verify search feature with one match", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);

    //open page
    await computersListPage.goto();
    //search invalid name
    await computersListPage.searchBy("Acer Extensa 5220");
    //click "filter by name"
    await computersListPage.clickFilter();
    //assert table displays 1 object
    await computersListPage.verifyItemsCountInTable(1);
  });


  test("Verify search feature with two matches", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);

    //open page
    await computersListPage.goto();
    //search invalid name
    await computersListPage.searchBy("red");
    //click "filter by name"
    await computersListPage.clickFilter();
    //assert table displays 1 object
    await computersListPage.verifyItemsCountInTable(2);
  });

});

//Task - 5
test("Verify search feature with no matches", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  //open page
  await computersListPage.goto();
  //search invalid name
  await computersListPage.searchBy("noMatch");
  //click "filter by name"
  await computersListPage.clickFilter();
  //assert table displays 1 object
  await computersListPage.verifyItemsCountInTable(0);
});
