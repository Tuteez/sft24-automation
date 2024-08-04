import { expect } from "@playwright/test";

export class ProductPreviewPage {
  constructor(page) {
    this.page = page;
  }

  async addProductToCartFromPreviewP(){
    await this.page.locator('#add-to-cart').click();
  };

  async removeProductfromCartFromPreviewP(){
    await this.page.locator('#remove').click();
  }

  async openCart(){
    await this.page.locator('span.shopping_cart_badge').click();
  }

};