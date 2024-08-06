import { expect } from "@playwright/test";
import { table } from "console";

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

  async AddNewComputer(name,data1,data2,company) {
    await this.page.locator("#name").fill(name);
    await this.page.locator("#introduced").fill(data1);
    await this.page.locator("#discontinued").fill(data2);
    await this.page.locator("#company").selectOption(company);
    await this.page.locator('input[type="submit"]').click();
    await expect(this.page.locator(".alert-message")).toContainText("Done");
  }

  async verifySearchNA(nonexistentname) {
    
    await this.page.locator('#searchbox').fill(nonexistentname);
    await this.page.click('input[type="submit"]');
    await this.page.textContent('.well .alert-message.warning').expect(noResultsMessage).toBe('Nothing to display');
  }

  async verifySearch(existingName) {
    
    await this.page.locator('#searchbox').fill(existingName);
    await this.page.click('input[type="submit"]');
    await expect(this.page.locator('table')).toHaveCount(1);
    
    
  }
}
