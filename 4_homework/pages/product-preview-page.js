import { expect } from "@playwright/test";

export class ProductPreviewPage {
  constructor(page) {
    this.page = page;
    this.firstProduct = page.locator('div.inventory_item_name').nth(0);
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.removeButton = page.locator('button:has-text("Remove")');
    this.shoppingCartLinkButton = page.locator('[data-test="shopping-cart-link"]') ;
  }

  // adds product to cart from the product preview page
    async addProductToCartFromPreview(){
    await this.firstProduct.click();
    await this.addToCartButton.click();
    await expect (this.removeButton).toBeVisible();


  }

//remove product from shipping cart by clicking Remove on product preview page
  async removeProductFromPreviewPage(){

    await this.removeButton.click();
    await expect(this.page.locator('button:has-text("Remove")')).not.toBeVisible();
  }

}
