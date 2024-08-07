import { expect } from "@playwright/test";

export class ProductAddTestPage {
    constructor(page) {
        this.page = page;
        this.invItemLocator = page.locator('div.inventory_item');
        this.addToCartButtonLocator = 'button[name^="add-to-cart"]'; // Add to cart button locator
        this.productLinkLocator = 'a[id^="item_"][id$="_title_link"]'; 
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.headerContainer = page.locator('#header_container');
        this.itemNameSelector = 'div[class="inventory_item_name "]';// Product link locator
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
        // Return a boolean indicating if the cart value matches the expected value
        return currentCartValue === expectedValue;
    }

    async clickCartButton() {
        await this.cartBadge.click();
    }

    //To add random product to the cart from overall products view
    async addRandomMain() {
        const inventoryItems = this.invItemLocator;
        const itemCount = await inventoryItems.count();
        
        const randomItemNumber = Math.floor(Math.random() * itemCount); 
        const item = inventoryItems.nth(randomItemNumber);
        
        // Get the product name to verify later
        const productName = await item.locator(this.itemNameSelector).innerText();
        await item.locator(this.addToCartButtonLocator).click();
        return productName;
    }

    async removeButtonInCart(productName) {
        await this.page.locator('.shopping_cart_link').click();
        const removeButton = this.page.locator(`button[name="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`);
        await expect(removeButton).toBeVisible();
    }
}