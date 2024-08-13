import { test, expect } from "@playwright/test";

export class CartPage{
    constructor(page){
        //page elementai
        this.page = page;
        this.cartItems = page.locator('div[class="cart_list"] div[class="cart_item"]');
        this.cartButtonRemoveLocator = this.page.locator('button[class="btn btn_secondary btn_small cart_button"]');
    }
    async getFirstCartItem() {
        return this.cartItems.first();
      }
      async getRemoveButtonText(firstCartItem) {
        return firstCartItem.locator('button[class="btn btn_secondary btn_small cart_button"]').innerText();
      }
}