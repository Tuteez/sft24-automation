import { expect } from "@playwright/test";

export class ProductPreviewPage {
    constructor(page) {
        this.page = page;
        this.addToCartButtonLocator = 'button[name^="add-to-cart"]';
        this.removeButtonLocator = page.locator('#remove');
        this.productLinkLocator = 'a[id^="item_"][id$="_title_link"]'; //need to correct
    }

    async enterProductPreview(item) {
        await item.locator(this.productLinkLocator).click();
    }
    
}