import { expect } from "@playwright/test";
import exp from "constants";

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  async checkCartRemoveButton(loc)
  {
      await expect (this.page.locator(loc)).toHaveCount(1);
  }
  async checkIfRemoves(loc)
  {
      await this.page.locator(loc).click();
      await expect(this.page.locator(loc)).toHaveCount(0);
  }
  

}