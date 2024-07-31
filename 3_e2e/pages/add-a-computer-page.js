import { expect } from "@playwright/test";

export class AddAcomputerPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://computer-database.gatling.io/computers/new");
    await expect(this.page).toHaveTitle("Computers database");
  }

  async enterComputerName(name) {
      await this.page.locator('#name').fill(name);
    }
    async enterIntroducedDate(date) {
        await this.page.locator('#introduced').fill(date);
    }
    async enterDiscontinuedDate(date) {
        await this.page.locator('#discontinued').fill(date);
    }
    async selectCompany(name) {
        await this.page.locator('#company').selectOption(name);
    }
    async clickSubmit() {
        await this.page.locator('input[type="submit"]').click();
    }
}