import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddComputerPage } from "../pages/add-computer-page";
import { ComputerData } from "../test-data/computer-data";

// Task - 1: Update existing test to verify computer creation workflow



test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator('#add').click();
  await page.locator('#name').fill("my pc");
  await page.locator('#introduced').fill("2000-10-10");
  await page.locator('#discontinued').fill("2022-10-10");
  await page.locator('#company').selectOption("RCA");
  await page.locator("[value='Create this computer']").click();
  await expect(page.locator('.alert-message')).toContainText('Done !');
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addComputerPage = new AddComputerPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addComputerPage.fillComputerName("my pc");
  await addComputerPage.fillIntroduced("2000-10-10");
  await addComputerPage.fillDiscontinued("2022-10-10");
  await addComputerPage.selectCompany("RCA");
  await addComputerPage.clickAddThisComputer();
  await computersListPage.confirmPage('Done !');
});

  //task 3:
test("Test search box", async ({ page }) => {
  
  await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#searchbox").fill("wjguroisklhsgrs");
  await page.locator("#searchsubmit").click();
  await expect (page.locator(".well")).toContainText('Nothing');
});

//task 4:
test.describe("Testing search box", () => {

//task 5:
  test.beforeEach(async ({ page }) => {
    await page.goto('https://computer-database.gatling.io/computers');
  });
  test("Test search box no 2", async ({ page }) => {
  
 // await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#searchbox").fill("cat");
  await page.locator("#searchsubmit").click();
  const count1 = await page.locator('tbody tr').count();
  await expect(count1).toEqual(4);
});
//
test("Test search box no 3", async ({ page }) => {
  
 // await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#searchbox").fill("can");
  await page.locator("#searchsubmit").click();
  const count2 = await page.locator('tbody tr').count();
  await expect(count2).toEqual(1);
});
});



//same test with parameters task 6
test.describe("Testing search box with parameters", () => {

  let searchCriterias = [
    {
      searchBy: "asdfaeg",
      reasultCount: 0,
    },
    {
      searchBy: "cat",
      reasultCount: 4,
    },
    {
      searchBy: "can",
      reasultCount: 1,
    },

  ];
  //task 5:
  //test.beforeEach(async ({ page }) => {
  //  await page.goto('https://computer-database.gatling.io/computers');
 // });
  searchCriterias.forEach((searchCriteria) => {
  test(`Verify search  feature with ${searchCriteria.reasultCount} matche(s)`, async ({ page }) => {
  
  await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#searchbox").fill(searchCriteria.searchBy);
  await page.locator("#searchsubmit").click();
  const count1 = await page.locator('tbody tr').count();
  await expect(count1).toEqual(searchCriteria.reasultCount);
});
});
});

//tast 7:
test("Create new computer with test data", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addNewComputerPage = new AddComputerPage(page);
  let computerData = {
    name: "New Computer",
    introduced: "2012-12-01",
    discontinued: "2022-12-01",
    company: "Sony",
  };
  await computersListPage.goto();

  await computersListPage.openNewComputerCreationPage();
  await addNewComputerPage.submitComputer(computerData);

  await computersListPage.confirmPage('Done !');
});


class ComputerData {
  constructor(name, startDate, endDate, manufacturer) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.manufacturer = manufacturer;
  }
}

// Create an instance of the ComputerData class

//test 8:
test("Create new computer with not hardcored test data", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addNewComputerPage = new AddComputerPage(page);
  let computerData = new ComputerData(
    "New Computer",
    "2012-12-01",
    "2022-12-01",
    "Sony"
  );
  await computersListPage.goto();

  await computersListPage.openNewComputerCreationPage();
  await addNewComputerPage.submitComputer(computerData);

  await computersListPage.confirmPage('Done !');
});
