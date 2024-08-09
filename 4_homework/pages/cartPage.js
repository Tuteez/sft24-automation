// add products to cart from main page
export class cartPage {
    constructor(page){
        this.page = page;
        this.goToCart = page.locator('ID=shopping-cart-container');
        this.removeFromCart = page.locator('ID=remove-sauce-labs-backpack');
}

async goToCart(){
    await this.goToCart.click;
}
async removeFromCart(){
    await this.removeFromCart.click;
    const badgeElement = page.locator('.cart_item div');
}


}