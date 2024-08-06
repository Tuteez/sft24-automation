import { expect } from "@playwright/test";

export class ProductPreviewPage {
    constructor(page) {
      this.page = page;
    }

  /**
   * Method that goes to a product preview page
   */
  async goto(){
    await this.page.goto("https://www.saucedemo.com/inventory-item.html?id=4"); 
    await expect(this.page.locator(".inventory_details_name")).toContainText("Sauce Labs"); 
  }

  /**
   * Clicks 'Add to cart' button
   */
  async clickAddToCart(){
    await this.page.locator("#add-to-cart").click();
  }

  /**
   * Verifies that after clicking 'Add to cart', the button changes into 'Remove',
   *  item is added into cart and the original 'Add to cart' button is no longer visible
   * @param {string} buttonValue the 'Remove' button text value
   */
  async verifyAddToCartClick(buttonValue){
    //verify that after clicking 'add to cart' the button changes into 'Remove'
    await expect(this.page.locator(".btn_secondary")).toContainText(buttonValue);

    //verify that after clicking 'add to cart' the button is not visible anymore
    await expect(this.page.locator("#add-to-cart")).not.toBeVisible();

    //verify that after clicking 'add to cart' the cart icon shows the ammount of items in cart
    await expect(this.page.locator(".shopping_cart_badge")).toContainText(/[1-9]/); 
  }

  /**
   * Verifies if the 'Add to cart' button exists
   */
  async verifyAddToCartBtn(buttonValue){
    await expect(this.page.locator(".btn_primary")).toContainText(buttonValue);
  }

  /**
   * Clicks the 'Remove' button
   */
  async clickRemoveBtn() {
    await this.page.locator("#remove").click();
  }

  /**
   * Verifies that after clicking 'Remove', the button changes into 'Add to cart',
   *  item is removed from cart and the original 'Remove' button is no longer visible
   * @param {string} buttonValue the 'Add to cart' button text value
   */
  async verifyRemoveClick(buttonValue){
    //verify that after clicking 'Remove' the button changes into 'Add to cart'
    await expect(this.page.locator("#add-to-cart")).toContainText(buttonValue);

    //verify that after clicking 'Remove' the button is not visible anymore
    await expect(this.page.locator("#remove")).not.toBeVisible();

    //verify that after clicking 'Remove' the cart is empty
    await expect(this.page.locator(".shopping_cart_badge")).not.toBeVisible();
  }

  /**
   * Verifies if the 'Remove' button exists
   */
  async verifyRemoveBtn(buttonValue){
    await expect(this.page.locator("#remove")).toContainText(buttonValue);
  }
}