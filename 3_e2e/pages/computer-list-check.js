import { expect } from "@playwright/test";

export class ComputersListCheckPage {
  constructor(page) {
    this.page = page;
  }

  async searchForRecord(txt) {
    await this.page.locator("#searchbox").fill(txt);
    await this.page.locator("#searchsubmit").click();
  }

  async verifySearchFailed(txt) {
    await expect(this.page.locator("#main > div.well > em")).toHaveText(txt);
  }

  async verifySearchSuccessfull1(txt) {
    await expect(this.page.locator("#main > table > tbody > tr > td:nth-child(1) > a")).toHaveText(txt);    
  }

  async verifySearchSuccessfull2(txt) {
    await expect(this.page.locator("#main > table > tbody > tr > td:nth-child(1) > a").first()).toHaveText(txt);
    await expect(this.page.locator("#main > table > tbody > tr > td:nth-child(1) > a").nth(1)).toContainText(txt);
  }

  async searchInComputerListNotFound(txt) {
    await this.searchForRecord(txt);
  }
}