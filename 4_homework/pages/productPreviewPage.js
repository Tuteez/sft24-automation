export class ProductPreviewPage{
    constructor(page){
        this.page=page;
        this.addItemToCartButton = page.locator('button[data-test="add-to-cart"]');
        this.removeItemButton = page.locator('button[data-test="remove"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }
    async addItemToCart(){
        await this.addItemToCartButton.click();
    }
    async removeItemFromCart(){
        await this.removeItemButton.click();
    }
    async isAddToCartButtonVisible() {
        return await this.addItemToCartButton.isVisible(); // Check if "Add to cart" button is visible
    }
    getCartBadge() {
        return this.cartBadge;
    }
}