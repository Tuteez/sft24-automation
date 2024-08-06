import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/cart.html");
    await expect(this.page).toHaveTitle("Swag Labs");
  };

  async clickRemoveButton() {
    await this.page.locator("#remove-sauce-labs-backpack").click();
  };
};

  