import { expect } from "@playwright/test";

export class CreateComputerPage{
  constructor(page) {
    this.page = page;
  }

async fillName(name){
  await this.page.locator("#name").fill(name);
}
async fillDate1(date1){
  await this.page.locator("#introduced").fill(date1);
}

async fillDate2(date2){
await this.page.locator("#discontinued").fill(date2);
}

async selectCompany(company){
   await this.page.locator("#company").selectOption(company);
}

  async clickButton(){
    await this.page.locator('input[type="submit"]').click();
}
}

