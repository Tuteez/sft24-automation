import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { NewComputerCreationPage } from "../pages/new-computer-creation-page";
import { AddComputerPage } from "../pages/add-computer-page";
import { ComputerData } from "../pages/computer-data";
// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");

  await page.locator("#add").click();
  await page.locator("#name").fill("something");
  await page.locator("#introduced").fill("1991-01-01");
  await page.locator("#discontinued").fill("2020-01-01");
  await page.locator("#company").selectOption('1');
  await page.locator("//input[@value='Create this computer']").click();

  await expect(page.locator('.alert-message.warning')).toContainText('Done');
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let newComputerCreationPage = new NewComputerCreationPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await newComputerCreationPage.fillComputerName("my pc");
  await newComputerCreationPage.fillIntroduced("2023-09-09");
  await newComputerCreationPage.fillDiscontinued("2024-09-09");
  await newComputerCreationPage.selectCompany("Nokia");
  await newComputerCreationPage.clickAddThisComputer();

  await computersListPage.checkSuccessMessage();
});
// 3 - Create test to check computers list search feature when search results doesnt fit to records

test("Verify search feature when no data", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();

  await computersListPage.searchBy("abc");
  await computersListPage.verifyNoItemsFound()
})
// 4 
test.describe("Task 4: Verify search feature", async () => {

  test("Verify search feature when no data", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  
    await computersListPage.searchBy("abc");
    await computersListPage.verifyNoItemsFound()
  })

  test("Verify search feature with one match", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  
    await computersListPage.searchBy("ASCI red");
    await computersListPage.checkItemsCountTable(1)
  })

  test("Verify search feature with two matches", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  
    await computersListPage.searchBy("ASCI blue");
    await computersListPage.checkItemsCountTable(2)
  })
});

// 5 - Introduce setup method (beforeEach) from previously created tests group

test.describe("Task 4: Verify search feature - with before each", async () => {
  let computersListPage;
  test.beforeEach(async ({page}) =>{
    computersListPage = new ComputersListPage(page)
    await computersListPage.goto();
  })
})


  test("Verify search feature when no data", async ({ page }) =>{
  
    await computersListPage.searchBy("abc");
    await computersListPage.verifyNoItemsFound()
  })

  test("Verify search feature with one match", async ({ page }) => {
  
    await computersListPage.searchBy("ASCI red");
    await computersListPage.checkItemsCountTable(1)
  })

  test("Verify search feature with two matches", async ({ page }) => {

  
    await computersListPage.searchBy("ASCI blue");
    await computersListPage.checkItemsCountTable(2)
  });

  //Optional task-6 rearrange created tests group to use parametrization

test.describe("Task 6: Verify search feature - with parametrization", async () => {
let searchCriterias = [
  {
    searchBy: "NoMatch",
    resultCount: 0,
  },
  {
    searchBy: "ASCI red",
    resultCount: 1,
  },
  {
    searchBy: "ASCI blue",
    resultCount: 2,
  },
];

searchCriterias.forEach((searchCriteria)=> {

  test("Verify search feature with ${searchCriteria.resultCriteria} match(es)", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
  
    await computersListPage.searchBy(searchCriteria.resultCriteria);
    await computersListPage.checkItemsCountTable(searchCriteria.resultCriteria)
  })
})
})

//Optional - 7 create object from values used in initial computer creation test

test("Create new computer with test data", async ({page}) =>{

  let computersListPage = new ComputersListPage(page);
  let addNewComputerPage = new AddComputerPage(page);
  let computerData = {
    name: "New computer",
    introduced: "2012-12-01",
    discontinued: "2022-12-01",
    company: "Sony",
  };
  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addNewComputerPage.submitComputer(computerData);

  await computersListPage.checkSuccessMessage();
});

//TASK - 8 introduce test data object instead of hardcoded values

test("Create new computer with test data - part 2", async ({page}) =>{
let computerData = new ComputerData (
  "New Computer",
  "2012-12-01",
  "2022-12-01",
  "Sony"
);
let computersListPage = new ComputersListPage(page);
let addNewComputerPage = new AddComputerPage(page);
await computersListPage.goto();

await computersListPage.openNewComputerCreationPage();
await addNewComputerPage.submitComputer(computerData);

await computersListPage.checkSuccessMessage();
})