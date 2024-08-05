export class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.addToCart = this.page.locator("#add-to-cart");
    this.addToChartButton = this.page.locator(
      ".inventory_details_container button"
    );
    this.cartBadge = this.page.locator(".shopping_cart_badge");
  }
}
