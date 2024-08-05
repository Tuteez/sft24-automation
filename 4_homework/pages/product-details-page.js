class ProductDetailsPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.locator('.btn_inventory');
        this.removeFromCartButton = page.locator('.btn_secondary');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async removeFromCart() {
        await this.removeFromCartButton.click();
    }
}

module.exports = ProductDetailsPage;