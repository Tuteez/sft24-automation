import { expect } from "@playwright/test";
// import { testData } from "../data/testData";

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
    await this.page.locator("#continue-shopping").click();
  }

  async verifyNumberOfProductsInCart(numberOfProducts) {
    await expect(this.page.locator(".shopping_cart_link")).toHaveText(numberOfProducts);
  }

  async goToCart() {
    await this.page.locator("#shopping_cart_container");
  }

}
