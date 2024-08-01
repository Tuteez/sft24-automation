import { expect } from "@playwright/test";

export class AddNewComputer {
  constructor(page) {
    this.page = page;
  }

  async fillName(name) {
    await this.page.locator('#name').fill(name);
  }
  async fillIntroduced(introducedDate) {
    await this.page.locator('#introduced').fill(introducedDate);
  }
  async fillDiscontinued(discontinuedDate) {
    await this.page.locator('#discontinued').fill(discontinuedDate);
  }
  async selectCompany(company) {
    await this.page.locator('#company').selectOption(company);
  }
  async clickConfirm() {
    await this.page.locator( "[value='Create this computer']").click();
  }
  
  

}
