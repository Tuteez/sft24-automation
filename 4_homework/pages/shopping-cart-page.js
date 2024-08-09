export class ShoppingCartPage {
  constructor(page) {
    this.page = page;
  }

  //go to shopping cart page
  async goToShoppingCartPage() {
    await this.page.waitForSelector("#shopping_cart_container");
    await this.page.locator("#shopping_cart_container").click();
  }

  //check if item have been added to the cart (if theres its title)
  async getItemTitle() {
    return await this.page.locator(".inventory_item_name");
  }

  //check if theres remove button in cart page
  async getRemoveButton() {
    await this.page.waitForSelector("#remove-sauce-labs-backpack");
    return await this.page.locator("#remove-sauce-labs-backpack");
  }

  //check if cart icon have badge after one item is added
  async getCartIconBadge() {
    return await this.page.locator(".shopping_cart_badge");
  }
}
