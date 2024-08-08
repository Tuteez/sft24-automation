import { expect } from "@playwright/test";

export class SearchResultPage {
  constructor(page) {
    this.page = page;
  }

  async countSearchResults(expectValue){
    let rCount= await this.page.locator('tbody tr').count();
    await expect(rCount).toBe(expectValue);}
   }
