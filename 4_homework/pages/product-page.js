import { expect } from "@playwright/test";

export class ProductPage {
  constructor(page) {
    this.page = page;
  }

  async addToCart(){
    this.page.locator('#add-to-cart').click();
  }
  async checkAdded(){
    await expect(this.page.locator(".shopping_cart_badge")).toHaveText("1");
    await expect(this.page.locator('#remove')).toHaveText("Remove");
  }
  async removeFromCart(){
    this.page.locator('#remove').click();
  }
  async checkRemoved(){
    await expect(this.page.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(this.page.locator('#add-to-cart')).toHaveText('Add to cart');
  }
}