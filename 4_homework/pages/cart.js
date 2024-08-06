export class Cart {
    constructor(page) {
      this.page = page;
      this.cartItemDiv = page.locator('div[class="cart_item"]');
      this.cartCounter = this.page.locator('.shopping_cart_badge');
    }
    async countCart() {
      const items = await this.page.$$('[data-test="inventory-item"]');
      console.log(`Number of items in the cart: ${items.length}`);
      return items.length
    }
  
    async removeFromCart()
    {
      await this.page.locator(".cart_button").first().click();
    }

    async confirmItemCount(count){
      let list = await this.cartItemDiv.allTextContents();
      return list.length == count;
    }
    async gotoCart() {
    
      await this.page.click('.shopping_cart_link');
      
    }
  }