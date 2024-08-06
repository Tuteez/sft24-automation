export class NewComputerCreationPage {
  constructor(page) {
    this.page = page;
  }

  async fillComputerName(computerName){
    await this.page.locator("#name").fill(computerName);
  }
  async fillIntroduced(value){
    await this.page.locator("#introduced").fill(value);
  }
  async fillDiscontinued(value){
    await this.page.locator("#discontinued").fill(value);
  }
  async selectCompany(value){
    await this.page.locator("#company").selectOption(value);
  }
  async clickAddThisComputer(value){
    await this.page.locator('input[type="submit"]').click();
  }
}
