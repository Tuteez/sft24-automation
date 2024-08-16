export class ShoppingCart{
    constructor(page){
        this.page = page;
        this.removeItemFromTheCartButton = page.locator('button[data-test="remove-sauce-labs-backpack"]');
        this.cartItem = page.locator("#cart_item");
        this.removedCartItem = page.locator('.removed_cart_item')
    }
    async removeItemFromTheCart(){
        await this.removeItemFromTheCartButton.click();
    }
    async verifyItemsInShoppingList(num){
        await expect(this.cartItem).toHaveCount(num);
      }
    getRemovedCartItem(){
        return this.removedCartItem;
    }
}