import { expect } from "@playwright/test";

export class ComputersListPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://computer-database.gatling.io/computers");
    await expect(this.page).toHaveTitle("Computers database");
  }

  async openNewComputerCreationPage() {
    await this.page.locator("#add").click();
    await expect(this.page.locator("#main h1")).toHaveText("Add a computer");
  }

  async sucessfullNewPC(){
    await expect(this.page.locator('.alert-message')).toContainText('Done !')
  }

  // for search box part
  async fillSearchBox(pc){
    await this.page.locator('#searchbox').fill(pc);
  }


  async clickSubmitSearch(){
    await this.page.locator('#searchsubmit').click();
  }
  
async noMatchingRecCheck(){
  await expect(this.page.locator('.well')).toContainText('Nothing to display');
}
  
   }
