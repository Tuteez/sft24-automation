export class CartPage {
  constructor(page) {
    this.page = page;
  };


  async removeFromCart() {
    await this.page.locator('button.cart_button').click();
  };

}