import { expect } from "@playwright/test";

export class CartPage {
    constructor(page) {
        this.page = page;
        this.inventoryItemName = page.locator('.inventory_item_name');
    }
}