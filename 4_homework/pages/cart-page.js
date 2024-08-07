import { expect } from "@playwright/test";

export class cartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator(".cart_list .cart_item");
    this.cartButton = page.locator("#shopping_cart_container");
    this.removeButton = page.locator("button:has-text('Remove')");
    this.cartTitle = page.locator(".title");
  };

  async openCart() {
    await this.cartButton.click();
    await expect(this.cartTitle).toHaveText("Your Cart");
  };

  async CartHasItems() {
    const cartItemsCount = await this.cartItems.count();
    expect(cartItemsCount).toBeGreaterThan(0);
  };

  async allCartItemsHaveRemoveButtons() {
    const cartItemsCount = await this.cartItems.count();

    for (let i = 0; i < cartItemsCount; i++) {
      const removeButton = this.cartItems.nth(i).locator("button:has-text('Remove')");
      await expect(removeButton).toBeVisible();
    };
  };

  async removeItemFromCart() {
    const initialCount = await this.removeButton.count();
    await this.removeButton.click();
    const updatedCount = await this.removeButton.count();
    expect(updatedCount).toBe(initialCount - 1);
  };
};
