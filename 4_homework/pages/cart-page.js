export class CartPage {
  constructor(page) {
    this.page = page;
    this.itemsInList = this.page.locator(".cart_list>.cart_item");
    this.actionButton = this.page.locator(".cart_item button");
  }
}
