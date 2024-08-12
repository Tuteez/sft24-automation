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

  async searchForComputer(value) {
    await this.page.locator("#searchbox").fill(value);
    await this.page.locator("#searchsubmit").click();
  }

  async checkEmptyList() {
    await expect(this.page.locator(".well")).toContainText("Nothing to display");
  }

  async checkNotEmptyList(value) {
    await expect(this.page.locator("tbody tr td:nth-child(1)")).toContainText(value);
  }
}
