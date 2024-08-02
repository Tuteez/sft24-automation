import { expect } from "@playwright/test";

export class AddToCart {
    constructor(page) {
        this.page = page;
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.productCards = page.locator('.inventory_item');
    }

    async verifyElementTextInAllProductCards(elementLocator, elementText) {
        // Pasiimame visus inventory items
        const inventoryItems = await this.productCards;

        for (let i = 0; i < inventoryItems.count(); i++) {
            const item = inventoryItems.nth(i);
             // Patikrinkite, ar inventory item turi elementą su tekstu
             await expect(item.locator(elementLocator)).toHaveText(elementText);
        }
    }

    async cLickRandomItemFromList(elementLocator) {
        // Pasiimame visus inventory items
        const clickableList = this.page.locator(elementLocator);
        //Elementų kiekis
        const count = await clickableList.count();
        //Random elementas
        let randomNumber = Math.floor(Math.random() * count);
            
        await clickableList.nth(randomNumber).click();
        return randomNumber
    }

    async clickTheElement(elementLocator){
        await this.page.locator(elementLocator).click();
    }

    async elementIsNotVisible(elementLocator) {
        // Nematomas
        await expect(this.page.locator(elementLocator)).toBeHidden();
    }

    async nthElementNotVisibleInAllProductCards(number, elementLocator){
        // Pasiimame visus inventory items
        const inventoryItems = await this.productCards;

        // Pasleptas
        await expect(inventoryItems.nth(number).locator(elementLocator)).toBeHidden();  
    }

    async nthElementIsVisibleInAllProductCards(number, elementLocator){
        // Pasiimame visus inventory items
        const inventoryItems = await this.productCards;

        // Matomas
        await expect(inventoryItems.nth(number).locator(elementLocator)).toBeVisible();  
    }

    async nthElementIsEnabledInAllProductCards(number, elementLocator){
        // Pasiimame visus inventory items
        const inventoryItems = await this.productCards;

        // Matomas
        await expect(inventoryItems.nth(number).locator(elementLocator)).toBeEnabled();  
    }

    async verifyElementText(elementLocator, elementText) {
        await expect(this.page.locator(elementLocator)).toHaveText(elementText);
    }

    async countElements(elementLocator, num) {
        // Pasiimame visus elementus
        const elementsNum = await this.page.locator(elementLocator).count();
        
        //Turi būti lygus num
        await expect(elementsNum).toBe(num);
    }    
}