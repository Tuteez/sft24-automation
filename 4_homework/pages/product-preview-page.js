export class ProductPreviewPage {
  constructor(page) {
    this.page = page;
  }

  //go to product perview page
  async goToProductPreviewPage() {
    await this.page.waitForSelector("#item_4_title_link");
    await this.page.locator("#item_4_title_link").click();
  }

  //check if product preview page has add to cart button
  async getAddToCartButton() {
    return await this.page.getByRole("button", { name: "Add to cart" });
  }

  //add item to cart in product preview page
  async addItemToCart() {
    await this.page.locator("#add-to-cart").click();
  }

  //check if cart icon have badge after one item is added
  async getCartIconBadge() {
    return await this.page.locator(".shopping_cart_badge");
  }

  //return products titles
  async getProductsTitles() {
    return await this.page.locator(".inventory_details_name").all();
  }

  //check if theres remove button in product preview page
  async getRemoveButton() {
    await this.page.waitForSelector("#remove");
    return await this.page.locator("#remove");
  }
}
