import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddAcomputerPage } from "../pages/add-a-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  //click "add new PC"
  await page.locator('#add').click();

  //fill the data
  await page.locator('#name').fill('New PC workshop');
  await expect(page.locator('#main h1')).toHaveText('Add a computer');
  await page.locator('#introduced').fill('2024-01-01');
  await page.locator('#discontinued').fill('2024-12-31');
  await page.locator('#company').selectOption("RCA");
  await page.locator('input[type="submit"]').click();
  await expect(page.locator('div.alert-message.warning')).toContainText('Done');
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addAcomputerPage = new AddAcomputerPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addAcomputerPage.enterComputerName('New computer');
  await addAcomputerPage.enterIntroducedDate('2024-01-01');
  await addAcomputerPage.enterDiscontinuedDate('2025-01-01');
  await addAcomputerPage.selectCompany('Nokia');
  await addAcomputerPage.clickSubmit();
  await computersListPage.checkIfCoputerCreated();
});
test("Check search functionality, when no results are found", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.searchInput("obuolys");
  await computersListPage.verifyNoData();
});
test.describe('Verify searching functionality', async () => {
  test("Check search functionality, when no results are found", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
    await computersListPage.searchInput("obuolys");
    await computersListPage.verifyItemscountInTable(0);
    await computersListPage.verifyNoData();
  });
  test("Check if search works with valid input, when there is one output", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
    await computersListPage.searchInput("ARRA");
    await computersListPage.verifyPCExists("ARRA");
    await computersListPage.verifyItemscountInTable(1);
  });
  test("Check if search works with valid input, when there is more than one output", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
    await computersListPage.searchInput("ACE");
    await computersListPage.verifyPCExists("ACE");
    await computersListPage.verifyItemscountInTable(6);
  });

  test.describe('Verify searching functionality using beforeEach', async () => {
    let computersListPage;
    test.beforeEach(async ({ page }) => {
      let computersListPage = new ComputersListPage(page);
      await computersListPage.goto();
    })
    test("Check search functionality, when no results are found", async ({ page }) => {
    
      await computersListPage.verifyItemscountInTable(0);
      await computersListPage.verifyNoData();
    });
    test("Check if search works with valid input, when there is one output", async ({ page }) => {
 
      await computersListPage.searchInput("ARRA");
      await computersListPage.verifyPCExists("ARRA");
      await computersListPage.verifyItemscountInTable(1);
    });
    test("Check if search works with valid input, when there is more than one output", async ({ page }) => {
   
      await computersListPage.searchInput("ACE");
      await computersListPage.verifyPCExists("ACE");
      await computersListPage.verifyItemscountInTable(6);
    });
  });
  test.describe ("Verify using parametrization", async () =>{
  let testData=[
    {
      input: 'obuolys',
      count: 0
    },
    {
      input: 'ARRA',
      count: 1
    },
    {
      input: 'ACE',
      count: 6
    }
  ]
  testData.forEach(({ testData }) => {
    test(`search`, async ({ page }) => {
      const computersListPage = new ComputersListPage(page);
  
      await computersListPage.goto();
      await computersListPage.searchInput(testData.input);
      await computersListPage.verifyItemscountInTable(testData.count);
    });
  });
})
})