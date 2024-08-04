export class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.addToCart = page.locator("#add-to-cart");
  }
}
