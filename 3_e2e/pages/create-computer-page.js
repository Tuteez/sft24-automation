import { expect } from "@playwright/test";

export class CreateComputerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async fillInComputerPage() {
    await this.page.locator("#name").fill("Dave");
    await this.page.locator("#introduced").fill("2000-08-07");
    await this.page.locator("#discontinued").fill("2000-10-11");
    await this.page.locator("#company").selectOption("Sony");
    await this.page.locator("input[type=submit]").click();
  }
}
