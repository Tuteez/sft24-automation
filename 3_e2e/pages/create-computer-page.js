import { expect } from "@playwright/test";

export class newComputersListPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://computer-database.gatling.io/computers");
    await expect(this.page).toHaveTitle("Computers database");
  }

  async fillSearch(value) {
    await this.page.locator("#searchbox").fill(value);
  }
  
  async clickFilter() {
    await this.page.locator("#searchsubmit").click();
  }

  async checkResultsWhenNull(value) {
    await expect(this.page.locator("div.well")).toContainText(value);
  }

  async checkResultsTable(value) {
    await expect(this.page.locator("table tbody tr")).toHaveCount(value);
  }

}
