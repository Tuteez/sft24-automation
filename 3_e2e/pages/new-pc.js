import { expect } from "@playwright/test";

export class NewComputerPage {
  constructor(page) {
    this.page = page;
  }

  async fillName(name) {
    await this.page.locator("#name").fill(name);
  }
  async fillIntroduceDate(date) {
    await this.page.locator("#introduced").fill(date);
  }
  async fillDiscontinuedDate(date) {
    await this.page.locator("#discontinued").fill(date);
  }
  async selectCompany(company) {
    await this.page.locator("#company").selectOption(company);
  }
  async createComputer() {
    await this.page.locator(".primary").click();
  }
}
