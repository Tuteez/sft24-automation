import { expect } from "@playwright/test";

export class ComputersListPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://computer-database.gatling.io/computers");
  }

  async openNewComputerCreationPage() {
    await this.page.locator("#add").click();
  }

  async hasComputerBeenCreated(computerName) {
    //await expect(this.page.locator(".alert-message")).toHaveText("Done !  Computer " + computerName + " has been created");
    await expect(this.page.locator(".alert-message").getByText("Done !")).toBeVisible();
  }
  async search(text) {
    await this.page.locator("#searchbox").fill(text);
    await this.page.locator("#searchsubmit").click();
  }
  async verifyNoData() {
    await expect(this.page.locator(".well")).toHaveText("Nothing to display");
  }
  async verifyDataAmount(number) {
    await expect(this.page.locator(".computers").table.number).toBe(number);
  }
}
