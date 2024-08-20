import {test, expect} from "@playwright/test";
import {ComputersListPage} from "../pages/computers-list-page";
import {AddNewComputer} from "../pages/new-add-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await expect(page).toHaveTitle("Computers database");
  await page.locator("#add").click();
  await expect(page.locator("#main h1")). toHaveText("Add a computer")
  await page.locator ("#name").fill("my pc");
  await page.locator("#introduced").fill("2004-08-01");
  await page.locator("#Discontinued").fill ("2006-08-01");
  await page.locator ("#Company").selectOption("Apple Inc.");
  await page.locator(".primary").click();
  await expect(page.locator(".alert-message.warning")).toContainText("Done")
  
});


//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addNewComputer = new AddNewComputer(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
//fill name
await addNewComputer.fillName("my pc");
await addNewComputer.fillIntroduceDate("2004-08-01");
await addNewComputer.fillDiscontinuedDate("2006-08-01");
await addNewComputer.selectCompany("Apple Inc.");
await addNewComputer.createComputer();

await computersListPage.hasComputerBeenCreated("my pc");
});

//Task - 3: Create test to check computers list search feature when search result doesn’t match any records
test("Verify search feature when no data", async ({ page }) => {

let computersListPage = new ComputersListPage(page);

await computersListPage.goto();
await computersListPage.search("noMatch");
await computersListPage.verifyNoData();
});
//Task - 4: Add at least two more tests for searching feature and move them all to same group (describe)
