import { expect } from "@playwright/test";

export class cartPage {
  constructor(page) {
    this.page = page;
  };

  async openCart() {
    await this.page.locator("#shopping_cart_container").click();
    await expect(this.page.locator(".title")).toHaveText("Your Cart");
  };

  async CartHasItems() {
    const cartItemsCount = await this.page.locator(".cart_list .cart_item").count();
    expect(cartItemsCount).toBeGreaterThan(0);
  };

  async allCartItemsHaveRemoveButtons() {
    const cartItems = this.page.locator(".cart_list .cart_item");
    const cartItemsCount = await cartItems.count();

    for (let i = 0; i < cartItemsCount; i++) {
      const removeButton = cartItems.nth(i).locator("button:has-text('Remove')");
      await expect(removeButton).toBeVisible();
    };
  };

  async removeItemFromCart() {
    const initialCount = await this.page.locator("button:has-text('Remove')").count()
    await this.page.locator("button:has-text('Remove')").click();
    const updatedCount = await this.page.locator("button:has-text('Remove')").count()
    expect(updatedCount).toBe(initialCount - 1);
  };

}
