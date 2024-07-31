import { expect } from "@playwright/test";

export class AddNewComputer {
  constructor(page) {
    this.page = page;
  }

  async fillName(name) {
    await this.page.locator("#name").fill(name);
  }

  async fillIntroductionDate(introDate) {
    await this.page.locator("#introduced").fill(introDate);
  }

  async fillDiscontinuationDate(discDate) {
    await this.page.locator("#discontinued").fill(discDate);
  }

  async selectCompanyName(companyName) {
  await this.page.locator("#company").selectOption(companyName);
  }

  async submitNewComputer() {
  await this.page.locator('input[type="submit"]').click();
  }
}
