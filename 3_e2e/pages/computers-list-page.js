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
  async enterSearchValue(searchValue){
    await this.page.locator("#searchbox").fill(searchValue);
  }
  async clickSearchSubmit(){
    await this.page.locator("#searchsubmit").click();
  }
  async verifyNoData(){
    await expect (this.page.locator(".well")).toContainText("Nothing to display");
  }
  async verifyItemsInTable(num){
    await expect(this.page.locator("table.computers.zebra-striped")).toHaveCount(num);
  }
}
