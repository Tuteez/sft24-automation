export class ProductPreviewPage {
  constructor(page) {
    this.page = page;
  }

  async goToProductPreviewPage() {
    const productTitleLink = "#item_4_title_link";
    await this.page.waitForSelector(productTitleLink);
    await this.page.locator(productTitleLink).click();
  }

  async getAddToCartButton() {
    return await this.page.getByRole("button", { name: "Add to cart" });
  }

  async addItemToCart() {
    await this.page.locator("#add-to-cart").click();
  }

  async getCartIconBadge() {
    return await this.page.locator(".shopping_cart_badge");
  }

  async getProductsTitles() {
    return await this.page.locator(".inventory_details_name").all();
  }

  async getRemoveButton() {
    await this.page.waitForSelector("#remove");
    return await this.page.locator("#remove");
  }
}
