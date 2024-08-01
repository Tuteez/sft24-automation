import { expect } from "@playwright/test";

export class CreateComputersPage {
  constructor(page) {
    this.page = page;
  }

  async fillComputerName(locator, txt) {
    await this.page.locator(locator).fill(txt);
  }

  async fillComputerIntroducedDate(locator, dateString) {
    await this.page.locator(locator).fill(dateString);
  }

  async fillComputerdDscontinuedDate(locator, dateString) {
    await this.page.locator(locator).fill(dateString);
  }

  async selectComputerCompany(locator, company) {
    await this.page.locator(locator).selectOption(company);
  }

  async registerCreatedComputer(locator) {
    await this.page.locator(locator).click();
  }
}
