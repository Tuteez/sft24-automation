import { expect } from "@playwright/test";

export class CartPage {
    constructor(page) {
      this.page = page;
    }

  /**
   * Method that goes to the user shopping cart page
   */
  async goto(){
    await this.page.goto("https://www.saucedemo.com/cart.html"); 
    await expect(this.page.locator(".header_secondary_container")).toContainText("Your Cart"); 
  }

  /**
  * Clicks the 'Remove' button
  */
  async clickRemoveBtn() {
    await this.page.locator("#remove-sauce-labs-backpack").click();
  }

  /**
   * Verifies that after clicking 'Remove', item is removed from cart
   *  and the original 'Remove' button is no longer visible
   */
  async verifyRemoveClick(){
    //verify that after clicking 'Remove' the button is not visible anymore
    await expect(this.page.locator("#remove-sauce-labs-backpack")).not.toBeVisible();

    //verify that after clicking 'Remove' the cart is empty
    await expect(this.page.locator(".shopping_cart_badge")).not.toBeVisible();

    //verify that after clicking 'Remove' the prduct is gone from the cart page
    await expect(this.page.locator(".inventory_item_name")).not.toBeVisible();
  }

  /**
   * Verifies if the 'Remove' button exists in the page 
   */
  async verifyRemoveBtn(){
    await expect(this.page.locator("#remove-sauce-labs-backpack")).toContainText("Remove");
  }

}