import { expect } from "@playwright/test";
export class ProductsListPageFour {
  constructor(page) {
    this.page = page;

    this.firstUserName = this.page.locator('#user-name');
    this.password = this.page.locator('#password');
    this.loginButton = this.page.locator('#login-button');
    this.itemName = this.page.locator('#item_4_title_link');
    this.addToCartItem = this.page.locator('#add-to-cart')
    this.addItem = this.page.locator('#add-to-cart-sauce-labs-backpack')
    this.itemRemove = this.page.locator('#remove')
  }


   async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await expect(this.page).toHaveTitle('Swag Labs');
   }
  //Log in with first user
  async login() {
    await this.firstUserName.fill('standard_user');;
    await this.password.fill('secret_sauce');
  
    //click login
    await this.loginButton.click();
  }

    //got to product page by clicking on the title
    async previewPageTitle() {
      await this.itemName.click();
      await expect(this.addToCartItem).toHaveText("Add to cart")
    
 
    }
//got to product page by clicking on the picture
async previewPageImage() {
  await this.itemName.click();
  await expect(this.addToCartItem).toHaveText("Add to cart")


}
// Verify 'Remove' button
async addToCart() {
  await this.addToCartItem.click();
  
   expect(await this.page.locator('#remove')).toHaveText("Remove")
  

    
    
  }
 



}

