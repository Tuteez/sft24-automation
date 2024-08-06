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

  async fillName(value) {
    await this.page.locator("#name").fill(value);
  }

  async fillIntroduced(value) {
    await this.page.locator("#introduced").fill(value);
  }

  async fillDiscontinued(value) {
    await this.page.locator("#discontinued").fill(value);
  }

  async chooseCompany(value) {
    await this.page.locator("#company").selectOption(value);
  }

  async clickDone() {
    await this.page.locator('input[type="submit"]').click();
    await expect(this.page.locator("div.alert-message.warning")).toContainText("Done");
  }
}
