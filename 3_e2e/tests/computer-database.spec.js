import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { AddNewComputer } from "../pages/create-new-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

test("Create new computer", async ({ page }) => {
  await page.goto("https://computer-database.gatling.io/computers");
  await page.locator("#add").click();
  await page.locator("#name").fill("good pc");
  await page.locator("#introduced").fill("1999-02-25");
  await page.locator("#discontinued").fill("2000-06-27");
  await page.locator("#company").selectOption("RCA");
  await page.locator(".primary").click();
  await expect(page).toHaveTitle("Computers database");
});

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let addNewComputer = new AddNewComputer(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();
// pradedam suvedineti
  await addNewComputer.fillName('Ignas');
  await addNewComputer.fillDateIntroduced("1989-03-16");
  await addNewComputer.fillDateIntroduced("1997-05-20");
  await addNewComputer.chooseCompany("RCA");
  await addNewComputer.clickAddButton("Ignas"); // paspaudzia mygtuka ir patikrina ar pridetas kompiuteris
});

//Task 3
test("Check search for a non existing computer", async({ page }) =>{
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.searchWrongComputers("hgh")
})

//Task 4

test.describe("Check search for diferent computers", ())
test("Check search for diferent computers", async({ page }) =>{
  let computersListPage = new ComputersListPage(page);

  await computersListPage.goto();
  await computersListPage.searchWrongComputers("hgh")
})