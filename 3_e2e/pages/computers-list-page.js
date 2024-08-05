import { expect } from "@playwright/test";
import { getRandomValues } from "crypto";

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
  

  async submitComputerDetails(name, date1, date2,company) {
   
    await this.page.locator("#name").fill(name);
    await this.page.locator("#introduced").fill(date1);
    await this.page.locator("#discontinued").fill(date2);
    await this.page.locator("#company").selectOption(company);
    await this.page.locator('input[type="submit"]').click();
    

  }
  async confirmSubmittion(){
  await expect(this.page.locator("div.alert-message.warning")).toContainText("Done");
  }


  async searchBy(search) {
    await this.page.locator("#searchbox").fill(search);
    await this.page.locator("#searchsubmit").click();
    
  }
  async verifyNoData() {
    await expect(this.page.locator("#main")).toContainText("No computer");

  }
  async verifyData(data){
    await expect(this.page.locator("#main h1")).toContainText(data);
  }
}
