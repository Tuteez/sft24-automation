import { expect } from "../../3_e2e/playwright.config";

export class AddToCart{
constructor(page){
    this.page = page;
    this.shoppingCart = page.locator('.shopping_cart_link');
    this.productItem = page.locator('.inventory_item');
    this.removeButtonInCart = page.locator('.removed_cart_item');
}

async addToCartButtonIsVisible(){
    await this.shoppingCart.toBeVisible();
    
  }
async addToCartButtonEnabled(){
    await expect(this.shoppingCart).toBeEnabled();
}

async verifyTextInAllElementsInProductCards(elementLocator, elementText) {
    let inventoryItems = await this.productCards;
    for (let i = 0; i < inventoryItems.count(); i++) {
        let item = inventoryItems.nth(i);
        await expect(item.locator(elementLocator)).toHaveText(elementText);
    }


}
async clickRandomItemFromList(elementLocator) {
    const clickableList = this.page.locator(elementLocator);
    const count = await clickableList.count();
    let randomNumber = Math.floor(Math.random() * count);
    await clickableList.nth(randomNumber).click();
    return randomNumber
}
async clickTheElement(elementLocator){
    await this.page.locator(elementLocator).click();
}

async elementIsNotVisible(elementLocator) {
    await expect(this.page.locator(elementLocator)).toBeHidden();
}

async nthElementNotVisibleInAllProductCards(number, elementLocator){
    let inventoryItems = await this.productCards;
    await expect(inventoryItems.nth(number).locator(elementLocator)).toBeHidden();  
}

async nthElementIsVisibleInAllProductCards(number, elementLocator){
    let inventoryItems = await this.productCards;
    await expect(inventoryItems.nth(number).locator(elementLocator)).toBeVisible();  
}

async nthElementIsEnabledInAllProductCards(number, elementLocator){
    let inventoryItems = await this.productCards;
    await expect(inventoryItems.nth(number).locator(elementLocator)).toBeEnabled();  
}

async verifyElementText(elementLocator, elementText) {
    await expect(this.page.locator(elementLocator)).toHaveText(elementText);
}

async countElements(elementLocator, num) {
    let elementsNum = await this.page.locator(elementLocator).count();
    await expect(elementsNum).toBe(num);
}    

async itemAfterRemoveButtonInCart(){
    await expect(page).removeButtonInCart
}
};