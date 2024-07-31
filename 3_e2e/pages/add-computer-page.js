import { expect } from "@playwright/test";

export class AddComputerPage {
  constructor(page) {
    this.page = page;
  }

  async fillComputerName(computerName) {
    await this.page.locator("#name").fill(computerName);
  }

  async fillIntroducedDate(introducedDate) {
    await this.page.locator("#introduced").fill(introducedDate);
  }

  async fillDiscontinuedDate(discontinuedDate) {
    await this.page.locator("#discontinued").fill(discontinuedDate);
  }

  async chooseCompany(companyName) {
    await this.page.locator("#company").selectOption({label: companyName});
  }
  
  async createNewComputer() {
    await this.page.locator('input[type="submit"]').click();
  }
}
