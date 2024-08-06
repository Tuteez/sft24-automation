import { expect } from "@playwright/test";

export class ItemDescriptionPage {
  constructor(page) {
    this.page = page;
  };

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory-item.html?id=4");
    await expect(this.page.locator("#back-to-products")).toContainText("Back to products");
  };

  async clickAddButton() {
    await this.page.locator("#add-to-cart").click();
  };

  async clickRemoveButton() {
    await this.page.locator("#remove").click();
  };
};