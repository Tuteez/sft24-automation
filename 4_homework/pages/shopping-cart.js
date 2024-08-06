import { expect } from "@playwright/test";

export class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }

  async removeItem(){
    this.page.locator('.cart_button').click();
    await expect(this.page.locator('.shopping_cart_badge')).toHaveCount(0);
  }
}