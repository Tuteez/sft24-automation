import { expect } from "@playwright/test";

export class ComputersListPage {
  constructor(page) {
    this.page = page;
  }

  async goto(url, txt) {
    await this.page.goto(url);
    await expect(this.page).toHaveTitle(txt);
  }

  async openNewComputerCreationPage(locator) {
    await this.page.locator(locator).click();
    await expect(this.page.locator("#main h1")).toHaveText("Add a computer");
  }
}