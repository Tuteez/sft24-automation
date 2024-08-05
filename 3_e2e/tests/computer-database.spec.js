import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddNewComputer } from "../pages/add-new-computer-page";
import { ComputerData } from "../test-data/computer-data";

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
  //await computersListPage.clickSearchSubmit();
  await computersListPage.verifyNoData();
});
//Task 4
test.describe("Task 4 verify search feature", async () => {
  test("verify search feature then no data", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);

    await computersListPage.goto();
    await computersListPage.enterSearchValue("qwe");
    //await computersListPage.clickSearchSubmit();
    await computersListPage.verifyNoData();
  });
  test("verify search feature then there is one result", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);

    await computersListPage.goto();
    await computersListPage.enterSearchValue("ASCI Red");
    //await computersListPage.clickSearchSubmit();
    await computersListPage.verifyItemsInTable(1);
  });
  test("verify search feature then there is two results", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);

    await computersListPage.goto();
    await computersListPage.enterSearchValue("ASCI Blue");
    //await computersListPage.clickSearchSubmit();
    await computersListPage.verifyItemsInTable(2);
  });
});
// task 5
test.describe("Task 5 verify search feature with setup (before each)", async() => {
  let computersListPage;
  test.beforeEach(async ({ page }) =>{
    computersListPage = new ComputersListPage(page);
    await computersListPage.goto(page);
  });
  test("verify search feature then no data", async () => {

    await computersListPage.enterSearchValue("qwe");
    //await computersListPage.clickSearchSubmit();
    await computersListPage.verifyNoData();
  });
  test("verify search feature then there is one result", async () => {

    await computersListPage.enterSearchValue("ASCI Red");
    //await computersListPage.clickSearchSubmit();
    await computersListPage.verifyItemsInTable(1);
  });
  test("verify search feature then there is two results", async () => {

    await computersListPage.enterSearchValue("ASCI Blue");
    //await computersListPage.clickSearchSubmit();
    await computersListPage.verifyItemsInTable(2);
  });
});
// task 6
test.describe ("Task 6, Rearrange previously created tests group to use parametrization", async() => {
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
    },
  ];

  searchCriterias.forEach((searchCriterias) => {
    test(`Verify search feature with ${searchCriterias.resultCount} matches`, async ({ page, }) => {
      let computersListPage = new ComputersListPage(page);

      await computersListPage.goto();
      await computersListPage.enterSearchValue(searchCriterias.searchBy);

      await computersListPage.verifyItemsInTable(searchCriterias.resultCount);
    })
  })
})
//task 7 Create object from values used in initial computer creation test
test ("Task 7, Create new computer with test data", async ({page}) => {
  let computersListPage = new ComputersListPage (page);
  let addNewComputer = new AddNewComputer (page);
  let computerData = {
    name: "New Computer",
    introduced: "2012-12-01",
    discontinued: "2022-12-01",
    company: "Sony"
  }
  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addNewComputer.submitComputer(computerData);
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");
  //await computersListPage.checkSuccessMessage();

});
//task 8 Introduce test data object instead of hardcoded values
test ("Task 8, Create new computer with test data - part 2", async ({page}) => {
  let computerData = new ComputerData(
    "New Computer",
    "2012-12-01",
    "2022-12-01",
    "Sony"
  );
  let computersListPage = new ComputersListPage(page);
  let addNewComputer = new AddNewComputer(page);
  await computersListPage.goto();

  await computersListPage.openNewComputerCreationPage();
  await addNewComputer.submitComputer(computerData);

  await expect(page.locator("div.alert-message.warning")).toContainText("Done");
  
});
