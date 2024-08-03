import { expect } from "@playwright/test";

export class AddNewComputer {
  constructor(page) {
    this.page = page;
  }

  async fillName(name) {
    await this.page.locator('#name').fill(name);;
  }

  async fillIntroduced(date1) {
    await this.page.locator('#introduced').fill(date1);
  }

  async fillDicscont(date2){
    await this.page.locator('#discontinued').fill(date2);
  }

  async fillCompany (company){
    await this.page.locator('#company').selectOption(company);
  }

  async clickSubmit(){
    await this.page.locator('.primary').click();
  }

}
