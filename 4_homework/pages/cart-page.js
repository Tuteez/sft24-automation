export class CartPage {
  constructor(page) {
    this.page = page;
    this.removeButton = page.locator(".item_price_bar button");
  }
}
