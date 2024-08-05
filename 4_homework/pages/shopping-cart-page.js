import { expect } from "@playwright/test";

export class ShoppingCartPage {
  constructor(page) {
    this.page = page;
    this.shoppingCartLinkButton = page.locator('[data-test="shopping-cart-link"]') ;
    this.removeButton = page.locator('button:has-text("Remove")') ;

  }

  
  //checks if there is a product in the shopping cart
  async isButtonRemovePresent(){

    await expect(this.removeButton).toBeVisible();
  }
   
// removed product from the shopping cart by clicking Remove next to the product
  async clickRemoveProduct(){
    await this.shoppingCartLinkButton.click();
    await this.removeButton.click();
  }

  // verifies that shopping cart is empty and with no Remove button
  async verifyProductRemoved(){
    await this.shoppingCartLinkButton.click();
     expect(this.removeButton).not.toBeVisible();

  }

  // verifies that shopping cart list is not empty and there is a remove product button
  async verifyProductAdded(){
    await this.shoppingCartLinkButton.click();
    await expect(this.removeButton).toBeVisible();

  }

  }



