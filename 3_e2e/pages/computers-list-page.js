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

  async fillSearchBox(value) {
    await this.page.locator("#searchbox").fill(value);
    await this.page.locator("#searchsubmit").click();
  }

  async noComputerFoundMessage() {
    await expect(this.page.locator("section>h1")).toContainText("No computer");
  }

  async oneResultFound() {
    await expect(this.page.locator("section#main>h1")).toContainText("One computer found");
  }


  async multipleResultsFound(expectedCount) {
    const resultsCount = await this.page.locator('table.computers tbody tr').count();
    expect(resultsCount).toBe(expectedCount, `Expected to find exactly ${expectedCount} rows in the search results table`);
  }
}
