import { expect } from "@playwright/test";

export class ProductAddTestPage {
    constructor(page) {
        this.page = page;
        this.invItemLocator = page.locator('div.inventory_item');
        this.addToCartButtonLocator = page.locator('button[name^="add-to-cart"]');
        this.productLinkLocator = page.locator('a[id^="item_"][id$="_title_link"]'); 
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.headerContainer = page.locator('#header_container');
        this.itemNameSelector = 'div[class="inventory_item_name "]';
    }

    async randomProductItem() {
        const inventoryItems = this.invItemLocator;
        const itemCount = await inventoryItems.count();
        
        const randomItemNumber = Math.floor(Math.random() * itemCount);
        const item = inventoryItems.nth(randomItemNumber);

        return item;
    }

    async enterProductPreview(item) {
        await item.locator(this.productLinkLocator).click();
    }

    async checkCartValue(expectedValue) {
        const currentCartValue = parseInt(await this.cartBadge.innerText(), 10);
        return currentCartValue === expectedValue;
    }

    async clickCartButton() {
        await this.cartBadge.click();
    }

    async clickAddToCartButton(item) {
        const addButton = this.getAddToCartButtonForItem(item);
        await addButton.click();
    }

    getAddToCartButtonForItem(item) {
        return item.locator('button[name^="add-to-cart"]');
    }
    
    //To add random product to the cart from overall products view
    async addRandomMain() {
        const inventoryItems = this.invItemLocator;
        const itemCount = await inventoryItems.count();
    
        const randomItemNumber = Math.floor(Math.random() * itemCount); 
        const item = inventoryItems.nth(randomItemNumber);
    
        const productName = await item.locator(this.itemNameSelector).innerText();
        const addButton = this.getAddToCartButtonForItem(item);
        await addButton.click();
        return productName;
        }

    getRemoveButtonLocator(itemName) {
        return this.page.locator(`button[name="remove-${itemName.toLowerCase().replace(/ /g, '-')}"]`);
    }   
}