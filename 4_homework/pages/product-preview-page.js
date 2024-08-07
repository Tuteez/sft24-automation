import { expect } from "@playwright/test";

export class ProductPreviewPage {
    constructor(page) {
        this.page = page;
        this.addToCartButtonLocator = 'button[name^="add-to-cart"]';
    }

    async verifyAddToCartButton() {
        expect(this.page.url().startsWith('https://www.saucedemo.com/inventory-item.html?')).toBeTruthy();
        const addToCartButton = this.page.locator(this.addToCartButtonLocator);
        await expect(addToCartButton).toBeVisible();
    }
}