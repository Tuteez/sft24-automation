import { expect } from "@playwright/test";

export class CartPage {
    constructor(page) {
        this.page = page;
    }

    async removeButtonExists() {
        await expect(this.page.locator('#remove-sauce-labs-backpack')).toContainText('Remove');
      }
}