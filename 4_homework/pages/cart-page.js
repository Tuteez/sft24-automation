export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItemDiv = page.locator('div[class="cart_item"]');
  }

  /**
   * Goes to cart page
   */
  async goto() {
    await this.page.goto("https://www.saucedemo.com/cart.html");
  }

  /**
   * Checks if amount of items in cart matches the given amount
   * @param {number} count number of items there should be in cart
   * @returns true if provided number matches amount of items in cart
   */
  async confirmItemCount(count){
    let list = await this.cartItemDiv.allTextContents();
    return list.length == count;
  }

  /**
   * Removes item from cart
   */
  async removeFromCart()
  {
    await this.page.locator(".cart_button").first().click();
  }
}
