import { expect } from "@playwright/test";

export class NewComputerCreationPage {
  constructor(page) {
    this.page = page;
  }

  async fillComputerName(value) {
    await this.page.locator("#name").fill(value);
  }

  async fillIntroduced(value) {
    await this.page.locator("#introduced").fill(value);
  }

  async fillDiscontinued(value) {
    await this.page.locator("#discontinued").fill(value);
  }

  async selectCompany(value) {
    await this.page.locator("#company").selectOption(value);
  }

  async clickAddThisComputer() {
    await this.page.locator("//input[@value='Create this computer']").click();
  }

  async checkSuccessMessage() {
    await expect(this.page.locator(".alert-message.warning")).toContainText("Done");
  }
}
