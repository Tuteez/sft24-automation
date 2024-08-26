const env = require('../env'); // Import the environment variables

class ProductPage {
    constructor(page) {
        this.page = page;
        this.sortDropdown = page.locator('.product_sort_container');
        this.productTitles = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
    }

    addToCartButton(itemName = env.items.backpack) {
        return this.page.locator(`.inventory_item:has-text("${itemName}")`).locator('button:has-text("Add to cart")');
    }

    removeButton(itemName = env.items.backpack) {
        return this.page.locator(`.inventory_item:has-text("${itemName}")`).locator('button:has-text("Remove")');
    }

    async sortProducts(option) {
        await this.sortDropdown.selectOption(option);
    }

    async addProductToCart(itemName = env.items.backpack) {
        await this.addToCartButton(itemName).click();
        await this.removeButton(itemName).waitFor({ state: 'visible', timeout: env.timeouts.default }); // Wait for Remove button
    }

    async removeProductFromCart(itemName = env.items.backpack) {
        await this.removeButton(itemName).click();
    }

    async getProductTitles() {
        return await this.productTitles.allTextContents();
    }

    async getProductPrices() {
        return await this.productPrices.allTextContents();
    }

    async getSortingOptions() {
        const options = await this.sortDropdown.locator('option').allTextContents();
        return options;
    }

    async openProductDetails(itemName = env.items.backpack) {
        await this.page.locator(`.inventory_item:has-text("${itemName}") .inventory_item_name`).click();
    }

    async addProductToCartFromDetails() {
        await this.page.locator('button:has-text("Add to cart")').click();
        await this.page.locator('button:has-text("Remove")').waitFor({ state: 'visible', timeout: env.timeouts.default }); // Wait for Remove button
    }

    async removeProductFromDetails() {
        await this.page.locator('button:has-text("Remove")').click();
    }

    async removeButtonFromDetails() {
        return this.page.locator('button:has-text("Remove")');
    }
}

module.exports = { ProductPage };
