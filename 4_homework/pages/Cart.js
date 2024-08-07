export class Cart {
    constructor(page) {
      this.page = page;
      this.itemNameDiv = page.locator('.inventory_item_name');
      this.itemPriceDiv = page.locator('.inventory_item_price');
      this.itemRemoveButtonDiv = page.locator('#remove-sauce-labs-backpack');
      this.itemRemovedCartItemDiv = page.locator('.removed_cart_item');
      //this.itemCartItemDiv = page.locator('.removed_cart_item');
      this.itemCartItemDiv = page.locator('.cart_item');
    }


    async getItemInCartName() {
        let ItemInCartName = await this.itemNameDiv.textContent();
        return ItemInCartName;
    }
    async getItemInCartPrice() {
        let ItemInCartPrice = await this.itemPriceDiv.textContent();
        return ItemInCartPrice;
    }

    async removeItemFromCart() {
        await this.itemRemoveButtonDiv.click();
    }

}