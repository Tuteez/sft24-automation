import { expect } from "@playwright/test";

export class AddNewComputerPage {
  constructor(page) {
    this.page = page;
  }



  async fillName(name) {
    await this.page.locator('#name').fill(name);
  }

  async fillIntroducedDate(date) {
    await this.page.locator('#introduced').fill(date);
  }
  async fillDiscontinuedDate(date) {
    await this.page.locator('#discontinued').fill(date);
  }

  async selectCompany(option) {
    await this.page.locator('#company').selectOption(option);
  }

  async clickCreateThisComputer(){
    await this.page.locator('input[type="submit"]').click();

  }
}
