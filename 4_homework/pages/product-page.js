import {expect} from '@playwright/test';

export class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
        this.cartIconLocator = page.locator('[data-test="shopping-cart-link"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.removeButtonLocator = page.locator('[data-test="remove"]');
    }

    async addToCart() {
        await expect(this.itemName).toHaveText("Sauce Labs Backpack");
        await this.addToCartButton.click();
    }
    async openCart() {
        await this.cartIconLocator.click();
    }
    async removeItem() {
        await this.removeButtonLocator.click();
    }
}
