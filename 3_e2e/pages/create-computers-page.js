import { expect } from "@playwright/test";

export class CreateComputersPage {
  constructor(page) {
    this.page = page;
  }
  async fillComputerName(locator, txt) {
    await page.locator(locator).fill(txt);
  }
  async fillComputerIntroducedDate(locator, dateString) {
    await page.locator(locator).fill(dateString);
  }
  async fillComputerdDscontinuedDate(locator, dateString) {
    await page.locator(locator).fill(dateString);
  }
  async selectComputerCompany(locator, selection) {
    await page.locator(locator).fill(selection);
  }
  async registerCreatedComputer(locator) {
    await this.page.locator(locator).click();
    await expect(this.page.locator("#main > div.alert-message.warning > strong")).toHaveText("Done !  ");    
  }
}