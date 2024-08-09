import { expect } from "@playwright/test";

export class ProductPreviewPage {
  constructor(page) {
    this.page = page;
  }

  async openPreview(productName) {
    await this.page.locator(`div:text("${productName}")`).click();
  }

  async buttonExists(buttonText) {
    await expect(this.page.getByText(buttonText)).toBeVisible();
  }

  async pressAddToCartButton(productName) {
    await this.page.locator(`div:text("${productName}")`).click();
    await this.page.getByText("Add to cart").click();
  }

  async backToHomePage() {
    await this.page.locator("#back-to-products").click();
  }

  async verifyNumberOfProductsInCart(numberOfProducts) {
    await expect(this.page.locator("#shopping_cart_container")).toHaveText(numberOfProducts);
  }

  async goToCart() {
    await this.page.locator("#shopping_cart_container").click();
  }

  async removeItemFromCart() {
    await this.page.locator("#remove").click();
  }

  async verifyProductsAddedToCart(numberOfProducts) {
    await expect(this.page.locator("#shopping_cart_container")).toHaveText(numberOfProducts);
  }

}
