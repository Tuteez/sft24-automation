export class ShoppingCart{
    constructor(page){
        this.page = page;
    }
    async removeItemFromTheCart(){
        await this.page.locator('button[data-test="remove-sauce-labs-backpack"]').click();
    }
}