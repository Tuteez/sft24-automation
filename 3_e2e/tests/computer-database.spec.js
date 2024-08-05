import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  //click add new pc
  await page.locator("#add").click();
  //fill name
  await page.locator("#name").fill('kompas');
  //date1
  await page.locator("#introduced").fill('2001-01-01');
  //date2
  await page.locator("#discontinued").fill('2009-09-09');
  //select company
  await page.locator("#company").selectOption('RCA');
  //submit button
  await page.locator('input[type="submit"]').click();
  await expect(page.locator("div.alert-message.warning")).toContainText("Done");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await computersListPage.submitComputerDetails("kompas","2001-01-01","2019-10-10",'RCA');
  await computersListPage.confirmSubmittion();

});

//task - 3 verify search feature with no data

test("Verify search feature with no data", async ({page}) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();
  await computersListPage.searchBy("noData");
  await computersListPage.verifyNoData();
});

//task 4 add two more tests to search feature, move them all to same group

test.describe("Task 4: Verify search feature", async () => {
  test("Verify search feature one match", async ({page}) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    await computersListPage.searchBy("Asci White");
    await computersListPage.verifyData("One computer found");
  })
test("Verify search feature with multiple matches", async ({page}) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();
  await computersListPage.searchBy("Lenovo");
  await computersListPage.verifyData("19 computers found");
})

test("Verify search feature with no data", async ({page}) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();
  await computersListPage.searchBy("noData");
  await computersListPage.verifyNoData();
});

})

//Task 5 introduce setup me           thod (beforeEach)

test.describe("Task 5: Verify search feature with beforeeach", async () => {
  let computersListPage;

  test.beforeEach(async ({ page }) => {
    computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  });
  test("Verify search feature one match", async ({page}) => {
    await computersListPage.searchBy("Asci White");
    await computersListPage.verifyData("One computer found");
  })
test("Verify search feature with multiple matches", async ({page}) => {
  await computersListPage.searchBy("Lenovo");
  await computersListPage.verifyData("19 computers found");
})

test("Verify search feature with no data", async ({page}) => {
  await computersListPage.searchBy("noData");
  await computersListPage.verifyNoData();
});

})

//6. Rearrange previously created tests group to use parametrization
/*test.describe("Task 6: Verify parametrization", async () => {
let searchCriterias = [
   
]
});
*/






