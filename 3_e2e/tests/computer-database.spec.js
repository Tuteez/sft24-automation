import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddNewComputer } from "../pages/add-new-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator("#add").click();
  await page.locator("#name").fill("my pc");
  await page.locator("#introduced").fill("2000-08-01");
  await page.locator("#discontinued").fill("2024-08-01");
  await page.locator("#company").selectOption("Canon");
  await page.locator("[value='Create this computer']").click();
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addNewComputer = new AddNewComputer(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await addNewComputer.fillName("my pc");
  await addNewComputer.fillIntroduced("2000-08-01");
  await addNewComputer.fillDiscontinued("2020-08-01");
  await addNewComputer.selectCompany("Canon");
  await addNewComputer.clickConfirm();
});
//Task 3
test("Create test to check computers list search feature when search result doesn’t match any records", async ({
  page,
}) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.enterSearchValue("qwe");
  await computersListPage.clickSearchSubmit();
  await computersListPage.verifyNoData();
});
//Task 4
test.describe("Task 4 verify search feature", async () => {
  test("verify search feature then no data", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);

    await computersListPage.goto();
    await computersListPage.enterSearchValue("qwe");
    await computersListPage.clickSearchSubmit();
    await computersListPage.verifyNoData();
  });
  test("verify search feature then there is one result", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);

    await computersListPage.goto();
    await computersListPage.enterSearchValue("ASCI Red");
    await computersListPage.verifyItemsInTable(1);
  });
});
