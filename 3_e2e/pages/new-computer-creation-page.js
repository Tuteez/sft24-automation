import { expect } from "@playwright/test";

export class NewComputerCreationPage {
  constructor(page) {
    this.page = page;
  }

  async fillComputerName(name) {
    await this.page.locator("#name").fill(name);
  }

  async fillComputerIntroduced(introduced) {
    await this.page.locator("#introduced").fill(introduced);
  }

  async fillComputerDiscontinued(discontinued) {
    await this.page.locator("#discontinued").fill(discontinued);
  }

  async fillComputerCompany(company) {
    await this.page.locator("#company").selectOption(company);
  }

  async createComputer() {
    await this.page.locator('input[type="submit"]').click();
  }

  
}
