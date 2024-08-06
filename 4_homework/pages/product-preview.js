export class ProductPreview {
    constructor(page) {
      this.page = page;
      this.cartItemDiv = page.locator('div[class="cart_item"]');
    }

    async goto(id) {
      await this.page.goto("https://www.saucedemo.com/inventory-item.html?id="+id);
    }
    async addToCart()
    {
      await this.page.locator('#add-to-cart').click();
    }
  
    async removeFromCart()
    {
      await this.page.locator("#remove").click();
    }
  }