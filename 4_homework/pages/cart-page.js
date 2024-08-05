class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.removeFromCartButtons = page.locator('.cart_button');
    }

    async getCartItems() {
        return this.cartItems.allInnerTexts();
    }

    async removeFromCart(productName) {
        const item = await this.page.locator(`.cart_item:has-text("${productName}")`);
        await item.locator('.cart_button').click();
    }
}

module.exports = CartPage;