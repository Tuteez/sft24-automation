import { test, expect } from "@playwright/test";

export class CartPage{
    constructor(page){
        //page elementai
        this.page = page;
        this.cartItems = page.locator('.cart_list .cart_item');

    }
}