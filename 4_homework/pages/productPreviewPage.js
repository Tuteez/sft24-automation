export class ProductPreviewPage{
    constructor(page){
        this.page=page;
    }
    async addItemToCart(){
        await this.page.locator('button[data-test="add-to-cart"]').click();
    }
    async removeItemFromCart(){
        await this.page.locator('button[data-test="remove"]').click();
    }
}