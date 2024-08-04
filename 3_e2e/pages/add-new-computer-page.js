import { expect } from "@playwright/test";

export class AddNewComputerPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://computer-database.gatling.io/computers");
    await expect(this.page).toHaveTitle("Computers database");
  }

  async fillForm() {
    await this.page.locator("#name").fill("Matas");
    // fill introduced
    await this.page.locator("#introduced").fill("2000-07-31");
    // fill discontinued
    await this.page.locator("#discontinued").fill("2024-07-31");
    // select
    await this.page.locator("#company").selectOption({ label: "RCA" });
    await this.page.locator('input[type="submit"]').click();
    await expect(this.page.locator(".alert-message")).toContainText("Done");
  }
}
