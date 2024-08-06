import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddNewComputer, addNewComputer } from "../pages/Add-new-pc-page";
import { describe } from "node:test";
import { SearchResultPage } from "../pages/search-result-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator('#add').click();
  await page.locator('#name').fill('my pc');
  await page.locator('#introduced').fill('2020-11-11');
  await page.locator('#discontinued').fill('2023-10-10');
  await page.locator('#company').selectOption('IBM');
  await page.locator('.primary').click();
  await expect(page.locator('.alert-message')).toContainText('Done !');
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  const computersListPage = new ComputersListPage(page);
  const addNewComputer = new AddNewComputer(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await addNewComputer.fillName('naujausias');
  await addNewComputer.fillIntroduced('2020-10-10');
  await addNewComputer.fillDicscont('2024-01-01');
  await addNewComputer.fillCompany('IBM');
  await addNewComputer.clickSubmit();

  await computersListPage.sucessfullNewPC();
});

// Task - 3: Create test to check computers list search feature when search result doesn’t match any records

test("Search Box test - non existing", async ({ page }) => {
  const computersListPage = new ComputersListPage(page);
  const searchResultPage = new SearchResultPage(page);

  await computersListPage.goto();
  await computersListPage.fillSearchBox('KRISTINA');
  await computersListPage.clickSubmitSearch();
  await computersListPage.noMatchingRecCheck();
});

//Task - 4: Add at least two more tests for searching feature and move them all to same group (describe)

test.describe("testing search box functions", () =>{

  test("Search Box test - non existing", async ({ page }) => {
    let computersListPage = new ComputersListPage(page);
    let searchResultPage = new SearchResultPage(page);
    await computersListPage.goto();
    await computersListPage.fillSearchBox('KRISTINA');
    await computersListPage.clickSubmitSearch();
    await computersListPage.noMatchingRecCheck();
  });
  test("Search Box test - 1 result", async ({ page }) =>{ 
    let computersListPage = new ComputersListPage(page);
    let searchResultPage = new SearchResultPage(page);
    await computersListPage.goto();
    await computersListPage.fillSearchBox('Acer Extensa 5220');
    await computersListPage.clickSubmitSearch();
    await searchResultPage.countSearchResults(1);}
  )
  test("Search Box test - 2 result", async ({ page }) =>{ 
    let computersListPage = new ComputersListPage(page);
    let searchResultPage = new SearchResultPage(page);
    await computersListPage.goto();
    await computersListPage.fillSearchBox('Acer Extensa');
    await computersListPage.clickSubmitSearch();
    await searchResultPage.countSearchResults(2);}
  )
  })

  // Task 5: Introducing beforeEach

  test.describe("testing search box functions with before Each", () =>{
    let computersListPage;
    let searchResultPage;

    test.beforeEach(async ({page})=>{
      computersListPage = new ComputersListPage(page);
      searchResultPage = new SearchResultPage(page);
      await computersListPage.goto();
    });

    test("Search Box test - non existing", async ({ page }) => {
      await computersListPage.fillSearchBox('KRISTINA');
      await computersListPage.clickSubmitSearch();
      await computersListPage.noMatchingRecCheck();
    });
    test("Search Box test - 1 result", async ({ page }) =>{ 
    
      await computersListPage.fillSearchBox('Acer Extensa 5220');
      await computersListPage.clickSubmitSearch();
      await searchResultPage.countSearchResults(1);}
    )
    test("Search Box test - 2 result", async ({ page }) =>{ 
      await computersListPage.fillSearchBox('Acer Extensa');
      await computersListPage.clickSubmitSearch();
      await searchResultPage.countSearchResults(2);}
    )
    })

    // Task 6: parameterization;
    test.describe("testing search box with before Each and parameterization", () =>{
      let computersListPage;
      let searchResultPage;
  
      test.beforeEach(async ({page})=>{
        computersListPage = new ComputersListPage(page);
        searchResultPage = new SearchResultPage(page);
        await computersListPage.goto();
      });

      const computers=[
        {pc:'KRISTINA', expectValue:0},
        {pc:'Acer Extensa 5220', expectValue:1},
        {pc:'Acer Extensa', expectValue:2},
        {pc:'Acer', expectValue:3},
        {pc:'Asci', expectValue:6},
      ];
  
      computers.forEach(({pc,expectValue})=>{
      test(`Searching for ${pc} - ${expectValue} result`, async ({ page }) =>{ 
        await computersListPage.fillSearchBox(pc);
        await computersListPage.clickSubmitSearch();
        await searchResultPage.countSearchResults(expectValue);
      });
    });
  });

  // 7.8. Defining new computer as an object;

  
test("Create new computer with object information", async ({ page }) => {
  const computersListPage = new ComputersListPage(page);
  const addNewComputer = new AddNewComputer(page);

  const NewComputerToCreate = {
    name:'Super PC',
    introduced: '1999-11-12',
    discont: '2000-10-10',
    company: 'IBM'
  };

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await addNewComputer.fillName(NewComputerToCreate.name);
  await addNewComputer.fillIntroduced(NewComputerToCreate.introduced);
  await addNewComputer.fillDicscont(NewComputerToCreate.discont);
  await addNewComputer.fillCompany(NewComputerToCreate.company);
  await addNewComputer.clickSubmit();

  await computersListPage.sucessfullNewPC();
});