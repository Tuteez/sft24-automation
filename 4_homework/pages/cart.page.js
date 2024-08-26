const env = require('../env'); // Import the environment variables

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        // Updated removeButton to use environment variables
        this.removeButton = (itemName) => this.page.locator(`text=${itemName}`).locator('button:has-text("Remove")');
    }

    removeButtonInCart(itemName) {
        return this.page.locator(`.cart_item:has-text("${itemName}") button:has-text("Remove")`);
    }

    async removeItem(itemName) {
        const removeButtonLocator = this.removeButtonInCart(itemName);
        await removeButtonLocator.waitFor({ state: 'visible', timeout: env.timeouts.default }); // Use timeout from env
        await removeButtonLocator.click();
    }

    async isItemInCart(itemName) {
        return await this.page.locator(`.inventory_item_name:has-text("${itemName}")`).count() > 0;
    }

    async navigateToCart() {
        await this.page.click('.shopping_cart_link');
    }

    async getNumberOfItems() {
        await this.navigateToCart();  // Ensure you're on the cart page
        const count = await this.cartItems.count();
        console.log(`Number of items in the cart: ${count}`);  // Debug statement
        return count;
    }
}

module.exports = { CartPage };

