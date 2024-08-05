import { expect } from "@playwright/test";
export class CartPage {
  constructor(page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto("https://www.saucedemo.com");
    await expect(this.page).toHaveTitle("Swag Labs");
    await this.page.locator("#user-name").fill("standard_user");
    // await this.page.locator("#user-name").fill("locked_out_user");
    // await this.page.locator("#user-name").fill("problem_user");
    // await this.page.locator("#user-name").fill("performance_glitch_user");
    // await this.page.locator("#user-name").fill("error_user");
    // await this.page.locator("#user-name").fill("visual_user");
    await this.page.locator("#password").fill("secret_sauce");
    await this.page.locator("#login-button").click();
  }

  async addCartButtonPresent() {
    const items = this.page.locator(".inventory_item_label");

    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const link = items.nth(i).locator("a");

      await Promise.all([
        link.click(),
        this.page.waitForNavigation({
          waitUntil: "networkidle",
          timeout: 60000,
        }),
      ]);

      const addToCartButton = this.page.locator(
        "button:has-text('Add to cart')"
      );
      await expect(addToCartButton).toBeVisible();

      await this.page.goBack();
      await this.page.waitForLoadState("load");
    }
  }

  async addToCartAndRemove() {
    const items = this.page.locator(".inventory_item_description");
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const button = items.nth(i).locator(".pricebar").locator("button");

      await button.scrollIntoViewIfNeeded();
      await button.waitFor({ state: "visible" });

      // Clicks all "Add to Cart" buttons in products list page
      await button.click();
    }

    await this.page.locator(".shopping_cart_link").click();
    const cartItems = this.page.locator(".cart_item");
    const cartCount = await cartItems.count();

    // Clicks Remove Buttons
    for (let i = 0; i < cartCount; i++) {
      await cartItems
        .first()
        .locator(".cart_item_label")
        .locator(".item_pricebar")
        .locator('button:text("Remove")')
        .click();
    }
    // Checks if there are any items left
    await expect(await this.page.locator(".cart_item").count()).toBe(0);
  }
}
