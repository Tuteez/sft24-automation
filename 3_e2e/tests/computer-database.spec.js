import { test, expect } from "@playwright/test";
import { ComputersListPage } from "../pages/computers-list-page";
import { CreateComputerPage } from "../pages/create-computer-page";

// Task - 1: Update existing test to verify computer creation workflow

// test("Create new computer", async ({ page }) => {
//   await page.goto("https://computer-database.gatling.io/computers");
//   await expect(page).toHaveTitle("Computers database");
//   //click add id pc
//   await page.locator("#add").click()
//   //fill name
//   await page.locator('#name').fill()
//   //fill date
//   await page.locator('#introduced').imput(Date)
  
// });

//Task - 2: Update existing test to verify computer creation workflow with POM
test("Create new computer with page object model", async ({ page }) => {
  let computersListPage = new ComputersListPage(page);
  let createComputerPage = new CreateComputerPage(page);

  await computersListPage.goto();
  await computersListPage.openNewComputerCreationPage();

  await createComputerPage.fillInComputerPage()

});
