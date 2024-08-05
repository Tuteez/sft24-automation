import { expect } from "@playwright/test";

export class ProductAddTestPage {
    constructor(page) {
        this.page = page;
        this.invItemLocator = page.locator('div.inventory_item');
        this.addToCartButtonLocator = 'button[name^="add-to-cart"]'; // Add to cart button locator
        this.productLinkLocator = 'a[id^="item_"][id$="_title_link"]'; // Product link locator
    }

    async inventoryItemsAddToCartButtons() {
        const inventoryItems = this.invItemLocator;
        const itemCount = await inventoryItems.count();
        
        //!PYTANIE!
        //CElem jest sprawdzenie czy przycisk jest przy każdym produkcie, a nie sprawdzenie
        //widoczności określonej ilości przycisków na stronie ogółem. Czy ten test można uzać?
        
        for (let i = 0; i < itemCount; i++) {
            const item = inventoryItems.nth(i); //Podobno to z pętlą działa jako wybór itemu (po selektorze)
            const addToCartButton = item.locator('button[name^="add-to-cart"]');
            await expect(addToCartButton).toBeVisible();
        }
    }

    //!PYTANIE!
    //Czy powinienem tu stosowac osobny PAGE pod stron z podglądem produktu? Czy moze tak zostac? 
    async productPreviewPagesAddButtons() {
        const itemLinks = this.page.locator('a[id^="item_"][id$="_title_link"]');
        const itemLinkCount = await itemLinks.count();
        
        // Does every preview page have add-to-card button visable?
        for (let i = 0; i < itemLinkCount; i++) {
            const itemLink = itemLinks.nth(i); //!!!PYTANIEto samo co wyzej
            await itemLink.click();
            expect(this.page.url().startsWith('https://www.saucedemo.com/inventory-item.html?')).toBeTruthy();
            const addToCartButton = this.page.locator(this.addToCartButtonLocator);
            await expect(addToCartButton).toBeVisible();
            await this.page.goBack();
        }
    }
}