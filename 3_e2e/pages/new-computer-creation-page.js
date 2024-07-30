import { expect } from "@playwright/test";

export class NewComputerCreationPage {
  constructor(page) {
    this.page = page;
  }

  async fillComputerName(computerName){
    await this.page.locator("#name").fill(computerName);
  }
  async fillComputerDateIntroduced(introducedDate){
    await this.page.locator("#introduced").fill(introducedDate);
  }
  async fillComputerDateDiscontinued(discontinuedDate){
    await this.page.locator("#discontinued").fill(discontinuedDate);
  }
  async fillComputerCompany(company){
    await this.page.locator("#company").selectOption(company);
  }

  async clickButton(){
    await this.page.locator(".btn.primary").click();
  }
}

