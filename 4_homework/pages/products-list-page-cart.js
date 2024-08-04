import { expect } from "@playwright/test";
export class ProductsListPageCart {
  constructor(page) {
    this.page = page;

    this.firstUserName = this.page.locator('#user-name');
    this.password = this.page.locator('#password');
    this.loginButton = this.page.locator('#login-button');
    this.itemName = this.page.locator('#item_4_title_link');
    this.addToCartItem = this.page.locator('#add-to-cart')
    this.addItem = this.page.locator('#add-to-cart-sauce-labs-backpack')
    this.itemRemove = this.page.locator('#remove')
    this.cartIcon = this.page.locator('.shopping_cart_link')
    this.specificItemRemove = this.page.locator('#remove-sauce-labs-backpack')
  }

  async clickOnCart (){
    await this.cartIcon.click()
    
    
  }

  // Method to check does all items have ‘Remove’ 
  async itemsContainRemove() {
    const items = await this.page.$$('.inventory_item')
    let allHaveRemove = true;
    for (const item of items) {
      const removeButton = await item.$('.btn.btn_secondary.btn_small.btn_inventory');
      if (!removeButton) {
          allHaveRemove = false;
        
          
          break ;
        ;
          
      }
      
  } return allHaveRemove
 

  }

  async ClickOnRemove (){
    await  this.specificItemRemove.click()
    

}

async isRemoveButtonVisible() {
  return await  this.specificItemRemove.isVisible();
}
}


