import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddComputerPage } from "../pages/add-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  
  await page.goto("https://computer-database.gatling.io/computers");
  
  await expect(page).toHaveTitle("Computers database");

  await page.locator('#add').click();
  await page.locator('#name').fill('Banana');
  await page.locator('#Introduced').fill('2000-10-01');
  await page.locator('#Discontinued').fill('2001-11-24');
  await page.locator('#Company').selectOption("Apple Inc.");
  await page.locator('#main > form > div > input').click();

});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  
  let computersListPage = new ComputersListPage(page);
  let addNewComputer = new AddComputerPage(page);
  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
  await addNewComputer.fillComputerName("pc");
  await addNewComputer.fillIntroduced("2003-01-01");
  await addNewComputer.fillDiscontinued("2004-02-02");
  await addNewComputer.selectCompany("Nokia");
  await addNewComputer.clickAddThisComputer();


});

test("test to check computers list search feature when search result doesn’t match any records", async ({ page }) => {
  
  let computersListPage = new ComputersListPage(page);
  await computersListPage.goto();
  await computersListPage.searchby('noMatch');
  await page.locator("#searchbox").fill('ABCD');
  await page.locator("#searchsubmit").click();
  await expect(page.locator('#main > div.well > em')).toContainText('Nothing to display');



});

