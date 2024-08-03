import { expect } from "@playwright/test";

export class CreateNewComputer {
  constructor(page) {
    this.page = page;
  }


  async fillComputersName(value) {
    await this.page.locator("div.input > input[id = 'name']").fill(value);
  }
  async fillIntroduced(value) {
    await this.page.locator("div.input > input[id = 'introduced']").fill(value);
  }

  async fillDiscontinued(value) {
    await this.page.locator("div.input > input[id ='discontinued']").fill(value);
  }

  async selectCompany(value) {
    await this.page.locator("#company").selectOption(value);
  }
  
  async createComputer() {
    await this.page.locator('//input[@value = "Create this computer"]').click();
  }

  async checkSuccessMessage() {
    await expect(this.page.locator('//div[@class= "alert-message warning"]')).toContainText ("Done !");
  }

  async submitComputer(computerData) {
    await this.page.locator("div.input > input[id = 'name']").fill(computerData.computerName);
    await this.page.locator("div.input > input[id = 'introduced']").fill(computerData.introduced);
    await this.page.locator("div.input > input[id ='discontinued']").fill(computerData.discontinued);
    await this.page.locator("#company").selectOption(computerData.company);
    await this.page.locator('//input[@value = "Create this computer"]').click();
    await expect(this.page.locator('//div[@class= "alert-message warning"]')).toContainText ("Done !");
  }
}
