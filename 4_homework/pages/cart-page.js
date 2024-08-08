import { expect } from "@playwright/test";

export class CartPage {
    constructor(page) {
        this.page = page;
        this.inventoryItemName = page.locator('.inventory_item_name');
        this.removeButtonCart = page.locator("button[id^=remove]")
    }

   
    get cartRemoveButtonLocator() {
        return this.removeButtonCart;
    }

    async clickRemoveButton() {
        await this.cartRemoveButtonLocator.click();
    }

}