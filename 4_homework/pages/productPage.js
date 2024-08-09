export class productPage {
    constructor(page) {
        this.page = page;
        this.itemLink = ('a[data-test="item-4-title-link"]');
        this.addCart = page.locator('ID=add-to-cart');
        this.removeCart = page.locator('ID=remove');
 }
async gotoProductsPage(){
  await this.page.goto('https://www.saucedemo.com/inventory.html');
}
async addToCart(){
  await this.itemLink.click;
  await this.addCart.click;
  const badgeElement = page.locator('.shopping_cart_badge[data-test="shopping-cart-badge"]');    
 }
async removeFromCart(){
  await this.itemLink.click;
  await this.removeCart.click;
  const badgeElement = page.locator('.shopping_cart_badge[data-test="shopping-cart-badge"]');    
 }
}