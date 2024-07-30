import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { computerCreationPage, NewComputerCreationPage } from "../pages/computer-creation-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");

  await page.locator("#add").click();
  await page.locator("#name").fill("test computer");
  await page.locator("#introduced").fill("1992-01-01");
  await page.locator("#discontinued").fill("2020-01-01");
  await page.locator("#company").selectOption("1");
  await page.locator("//input[@value='Create this computer']").click()

  await expect(page.locator(".alert-message.warning")).toContainText("Done");

});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let computerCreationPage = new NewComputerCreationPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await computerCreationPage.fillComputerName("new pc");
  await computerCreationPage.fillIntroduced("1992-01-01");
  await computerCreationPage.fillDiscontinued("2020-01-01")
  await computerCreationPage.selectCompany("Nokia");
  await computerCreationPage.clickAddThisComputer();

  await computerCreationPage.checkSuccessMessage();
});

//3
test("Check if list is empty", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();

  await computersListPage.searchForComputer("Szlay");
  await computersListPage.checkEmptyList();
})

//4- Add at least two more tests for searching feature and move them all to same group (describe)
test.describe("searching feature tests", () => {

  test("Check if list1 is not empty", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
  
    await computersListPage.searchForComputer("Acer Iconia");
    await computersListPage.checkNotEmptyList("Acer Iconia");
  });

  test("Check if list2 is not empty", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
  
    await computersListPage.searchForComputer("APEXC");
    await computersListPage.checkNotEmptyList("APEXC");
  });

});

//5 - Introduce setup method (beforeEach) from previously created tests group

test.describe("Another test with beforeEach", () => {
  let computersListPage;
  test.beforeEach(async({page}) => {
    computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  });

  test("Check if list1 is not empty", async ({ page }) => {
    await computersListPage.searchForComputer("Acer Iconia");
    await computersListPage.checkNotEmptyList("Acer Iconia");
  });

  test("Check if list2 is not empty", async ({ page }) => {
    await computersListPage.searchForComputer("APEXC");
    await computersListPage.checkNotEmptyList("APEXC");
  });

  test("Check if list3 is not empty", async ({ page }) => {
    await computersListPage.searchForComputer("ChipTest");
    await computersListPage.checkNotEmptyList("ChipTest");
  });

});