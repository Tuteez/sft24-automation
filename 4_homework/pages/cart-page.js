import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.locator("#shopping_cart_container").click();
  }

  async backToHomePage() {
    await this.page.locator("#back-to-products").click();
  }

  async removeFromCart(productName) {
    const item = this.page.locator(`.cart_item:has(.inventory_item_name:text-is("${productName}"))`);
    await item.locator('button[id*="remove"]').click();
  }

  async verifyThatItemIsRemoved(productName) {
    const itemLocator = this.page.locator(`.inventory_item_name:text-is("${productName}")`);
    await expect(itemLocator).toHaveCount(0);
  }
}
