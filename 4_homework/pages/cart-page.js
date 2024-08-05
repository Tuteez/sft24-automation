import {expect} from '@playwright/test';

export class CartPage {
    constructor(page) {
        this.page = page;
        this.itemInCart = page.locator('[data-test="inventory-item-name"]');
        this.itemTitleInCart = page.locator('[data-test="title"]');
        this.itemInCartQuantity = page.locator('[data-test="item-quantity"]');
        this.removeButtonLocator = page.locator('[data-test="remove-sauce-labs-backpack"]');
    }

    async checkCart(item, quantity) {
        await expect(this.itemTitleInCart).toHaveText("Your Cart");
        await expect(this.itemInCart).toHaveText(item);
        await expect(this.itemInCartQuantity).toHaveText(quantity);
    }

    async removeItem() {
        await this.removeButtonLocator.click();
    }

    async checkEmptyCart() {
        await expect(this.itemTitleInCart).toHaveText("Your Cart");
        await expect(this.itemInCart).toHaveCount(0);
        await expect(this.itemInCartQuantity).toHaveCount(0);
    }
}
