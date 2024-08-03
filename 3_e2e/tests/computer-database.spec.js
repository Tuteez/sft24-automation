import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { CreateNewComputer } from "../pages/new-computer-creation-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator('#add').click();
  await page.locator("div.input > input[id='name']").fill('Kuki');
  await page.locator("div.input > input[id='introduced']").fill('1992-03-29');
  await page.locator("div.input > input[id='discontinued']").fill('2020-01-01');
  await page.locator("#company").selectOption('BBN Technologies');
  await page.locator('//input[@value="Create this computer"]').click();
  await expect(page.locator('//div[@class="alert-message warning"]')).toContainText ("Done !");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let createNewComputer = new CreateNewComputer(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  
  await createNewComputer.fillComputersName('Station Zwei');
  await createNewComputer.fillIntroduced('2010-05-23');
  await createNewComputer.fillDiscontinued('2015-08-30');
  await createNewComputer.selectCompany('IBM')
  await createNewComputer.createComputer()
  await createNewComputer.checkSuccessMessage()
});

//Task - 3: Create test to check computers list 
//search feature when search result doesn’t match any records.

test("Search Verification - NoData", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.fillSearchBox('Random Stuff');
  await computersListPage.noComputerFoundMessage();
});

//Task - 4: Add at least two more tests for searching feature and move
// them all to same group (describe)

test.describe("Task - 4 search machine", async() => {
  test("Search Verification - NoData", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
    await computersListPage.fillSearchBox('Random Stuff');
    await computersListPage.noComputerFoundMessage();
  });

  test("Search Verification - 1 Result To Be Found", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
    await computersListPage.fillSearchBox('PlayStation 2');
    await computersListPage.oneResultFound();
  });

  test("Search Verification - 4 Results To Be Found", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
  
    await computersListPage.goto();
    await computersListPage.fillSearchBox('PlayStation');
    await computersListPage.multipleResultsFound(4);
  });
});

//Task - 5: Introduce setup method (beforeEach) from previously created tests group

  test.describe("Task - 5 before Each + search machine", () => {
    let computersListPage;
    test.beforeEach(async ({ page }) => {
    computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    });

  test("Search Verification - NoData", async ({ page }) => {
    await computersListPage.fillSearchBox('Random Stuff');
    await computersListPage.noComputerFoundMessage();
  });

  test("Search Verification - 1 Results To Be Found", async ({ page }) => {
    await computersListPage.fillSearchBox('PlayStation 2');
    await computersListPage.multipleResultsFound(1); // Assertion is inside the method
  });


  test("Search Verification - 4 Results To Be Found", async ({ page }) => {
    await computersListPage.fillSearchBox('PlayStation');
    await computersListPage.multipleResultsFound(4); // Assertion is inside the method
  });
});

//Task -6:  Rearrange previously created tests group to use parametrization
test.describe("Task - 6   parametrization before Each + search machine", async () => {
  
  let searchCriterias = [
    {searchBy: 'Random Stuff',
     resultsToFind: 0
    },
    {searchBy: 'PlayStation 2',
      resultsToFind: 1
     },
     {searchBy: 'PlayStation',
      resultsToFind: 4
     }
  ];
    
  
  searchCriterias.forEach((searchCriteria) => {
  
  test(`Search Verification - ${searchCriteria.resultsToFind} Results To Be Found`, async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    await computersListPage.goto();
    await computersListPage.fillSearchBox(searchCriteria.searchBy);
    await computersListPage.multipleResultsFound(searchCriteria.resultsToFind);
  });
});
});

//Task - 7,8: Create object from values used in initial computer creation test
//Introduce test data object instead of hardcoded values
test("Create new computer with page object model2", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let createNewComputer = new CreateNewComputer(page);

  let myComputerData1 = {
    computerName : 'Station Drei',
    introduced : '2010-05-23',
    discontinued : '2015-08-30',
    company : 'IBM'
  };
  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await createNewComputer.submitComputer(myComputerData1);
  await createNewComputer.checkSuccessMessage()
});
