export class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.actionButton = this.page.locator(
      ".inventory_details_desc_container button"
    );
    this.cartBadge = this.page.locator(".shopping_cart_badge");
  }
}
