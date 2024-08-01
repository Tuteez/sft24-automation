import { expect } from "@playwright/test";

export class ComputersListCheckPage {
  constructor(page) {
    this.page = page;
  }
  async searchForRecord(txt) {
    await page.locator("#searchbox").fill(txt);
    await page.locator("#searchsubmit").click();
  }
  async verifySearchFailed(txt) {
    await expect(this.page.locator("#main > div.well > em")).toHaveText(txt);
  }
  async verifySearchSuccessfull1(txt) {
    await expect(this.page.locator("#main > table > tbody > tr > td:nth-child(1) > a")).toHaveText(txt);    
  }
  async verifySearchSuccessfull2(txt) {
    await expect(this.page.locator("#main > table > tbody > tr > td:nth-child(1) > a")).toHaveText(txt);
    await expect(this.page.locator("#main > table > tbody > tr > td:nth-child(2) > a")).toHaveText(txt);
  }

}