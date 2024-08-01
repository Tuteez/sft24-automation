import { ComputerData } from "../test-data/computer-data";

export class AddComputerPage {
  constructor(page) {
    this.page = page;
  }

  async fillComputerName(name) {
    await this.page.locator("#name").fill(name);
  }

  async fillIntroduced(date) {
    await this.page.locator("#introduced").fill(date);
  }

  async fillDiscontinued(date) {
    await this.page.locator("#discontinued").fill(date);
  }

  async selectCompany(company) {
    await this.page.locator("#company").selectOption(company);
  }

  async clickAddThisComputer() {
    await this.page.locator('input[type="submit"]').click();
  }

  // Task 7 & 8: Introduced method to fill all fields
  async submitComputer(computerData) {
    await this.fillComputerName(computerData.name);
    await this.fillIntroduced(computerData.introduced);
    await this.fillDiscontinued(computerData.discontinued);
    await this.selectCompany(computerData.company);
    await this.clickAddThisComputer();
  }
}
