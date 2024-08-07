import { expect } from "@playwright/test";

export class ProductPreviewPage {

    constructor(page) {
        this.page = page;
      }

    async checkAddToCartButton() {
        await expect(this.page.locator('#add-to-cart')).toContainText('Add to cart');
      }
    
    async removeButtonExists() {
        await expect(this.page.locator('#remove')).toContainText('Remove');
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}