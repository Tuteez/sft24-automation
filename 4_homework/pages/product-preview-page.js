import { expect } from "@playwright/test";

export class productPreviewPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.addToCartButton = page.locator('#add-to-cart');
    this.removeFromCartButton = page.locator('#remove');
  };

  async addToCart() {
    await this.addToCartButton.click();
  };

  async isProductInCart() {
    await expect(this.cartBadge).toBeVisible({ timeout: 2500 });
    await expect(this.cartBadge).toHaveText('1');
  };

  async removeFromCart() {
    await this.removeFromCartButton.click();
  };

  async isProductRemovedFromCart() {
    await expect(this.cartBadge).not.toBeVisible();
  };
};