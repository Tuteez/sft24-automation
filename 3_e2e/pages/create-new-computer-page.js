import { expect } from "@playwright/test";

export class AddNewComputer {
  constructor(page) {
    this.page = page;
  }

  async fillName(name) {
    await this.page.locator("#name").fill(name);
  }

  async fillDateIntroduced(datestart) {
    await this.page.locator("#introduced").fill(datestart);
  }

  async fillDateDiscontinued(dateend) {
    await this.page.locator("#discontinued").fill(dateend);
  }
  
  async chooseCompany(company) {
    await this.page.locator("#company").selectOption(company);
  }

  async clickAddButton(name) {
    await this.page.locator(".primary").click();
    await expect(this.page.locator(".alert-message")).toHaveText("Done ! Computer " + name + " has been created");
  }
}


