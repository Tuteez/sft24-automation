import { expect } from "@playwright/test";
import { name } from "../playwright.config";

export class SaucedemoProductsRemoveFromCartPage {
  constructor(page) {
    this.page = page;
  }

  async removeFromCartOnClick () {
    await this.page.goto("https://www.saucedemo.com/static/js/components/CartItem.jsx");
    await expect(this.page.locator('onClick={() => removeFromCart(id)}')).toBeTruthy();
  }
}
