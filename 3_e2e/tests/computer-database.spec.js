import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { CreateComputerPage } from "../pages/create-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  //click add new pc
  await page.locator("#add").click();
  //fill name
  await page.locator("#name").fill("asus");
  //fill date1
  await page.locator("#introduced").fill("2024-01-01");
  //fill date2
  await page.locator("#discontinued").fill("2024-07-31");
  //select company
  await page.locator("#company").selectOption("Nokia");
//click create computer
  await page.locator('input[type="submit"]').click();
  //add assert correct message
  await expect(page.locator(".alert-message")).toContainText("Done");
}); 

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
let createComputerPage = new CreateComputerPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await createComputerPage.fillName("asus");
  await createComputerPage.fillDate1("2024-01-01");
  await createComputerPage.fillDate2("2024-07-31");
  await createComputerPage.selectCompany("Nokia");
await createComputerPage.clickButton();

await expect(page.locator(".alert-message")).toContainText("Done");
});

//Task-3
test("Verify search feature with no data", async ({ page }) => {
let computerListPage = new ComputersListPage(page);
//open page
await computerListPage.goto();
//search invalid name
  await computerListPage.searchBy("null");
//click filter by name
await computerListPage.clickFilterByName();
//assert error "Nothing to display"
await expect(page.locator(".well")).toHaveText("Nothing to display");
})

//Task-4 add two test for search and add 
test.describe("Task 4: Verify search feature", async () => {


test("Verify search feature with one match", async ({ page }) => {
  let computerListPage = new ComputersListPage(page);
  //open page
  await computerListPage.goto();

  //search invalid name
    await computerListPage.searchBy("acer iconia");

  //click filter by name
  await computerListPage.clickFilterByName();

  //table gives one search result"
  await computerListPage.verifyItemCountInTable(1)

});

test("Verify search feature with two match", async ({ page }) => {
  let computerListPage = new ComputersListPage(page);
  //open page
  await computerListPage.goto();

  //search invalid name
    await computerListPage.searchBy("acer extensa");

  //click filter by name
  await computerListPage.clickFilterByName();

  //table gives one search result"
  await computerListPage.verifyItemCountInTable(2)

});

//Task-5  Introduce setup method (beforeEach) from previously created tests group

test("Verify search feature with one match", async ({ page }) => {
  let computerListPage = new ComputersListPage(page);
  //open page
  await computerListPage.goto();

  //search invalid name
    await computerListPage.searchBy("acer iconia");

  //click filter by name
  await computerListPage.clickFilterByName();

  //table gives one search result"
  await computerListPage.verifyItemCountInTable(1)

});
})
