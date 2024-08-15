export class ProductPreviewPage{
    constructor(page){
        this.page=page;
        this.addItemToCartButton = page.locator('button[data-test="add-to-cart"]');
        this.removeItemButton = page.locator('button[data-test="remove"]');
    }
    async addItemToCart(){
        await this.addItemToCartButton.click();
    }
    async removeItemFromCart(){
        await this.removeItemButton.click();
    }
}