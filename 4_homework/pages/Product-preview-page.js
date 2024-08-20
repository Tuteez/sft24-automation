export class ProductPreviewPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Goes to preview page for item with selected id
   * @param {number} id item id 
   */
  async goto(id) {
    await this.page.goto("https://www.saucedemo.com/inventory-item.html?id="+id);
  }

  /**
   * Presses add to cart button
   */
  async addToCart() {
    await this.page.locator("#add-to-cart").click();
  }

  /**
   * Presses remove button
   */
  async removeFromCart() {
    await this.page.locator("#remove").click();
  }
}
