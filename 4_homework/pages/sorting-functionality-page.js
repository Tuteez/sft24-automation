import { expect } from "../../3_e2e/playwright.config";

export class SortingFunctionalityPage {
  constructor(page) {
    this.page = page;
    this.dropDownElement = page.locator('.product_sort_container');
    this.filterOptionByNameAz = page.locator('option[value="az"]');
    this.filterOptionByNameZa = page.locator('option[value="za"]');
    this.filterOptionByPriceHighLow = page.locator('option[value="hilo');
    this.filterOptionByPriceLowHigh = page.locator('option[value="lohi"]');
    this.pageConfirmation = page.toHaveURL('https://www.saucedemo.com/inventory.html');
  }
  

  async nextPageConfirmation (){
    await expect(nextPageConfirmation);
    await expect(this.page).toHaveText("Products");
  }
  async filterElementIsVisible(){
    await this.dropDownElement.toBeVisible();
    // await element.boundingBox();
    // await page.viewportSize();
  }
  async filterElementIsEnabled (){
    await expect(this.dropDownElement).toBeEnabled();
  }

  async filterElementIsOnTheRightSide (){
    const pageWidth = await this.page.evaluate(() => window.innerWidth);
    const dropdownBox = await this.page.locator(this.dropDownElement).boundingBox();
    expect(dropdownBox.x + dropdownBox.width / 2).toBeGreaterThan(pageWidth / 2);
  }

  async filterElementIsOnTheTop (){
    const dropdownBox = await this.dropDownElement.boundingBox();
    expect(dropdownBox.y).toBeLessThan(150);
  }

    async dropdownElementOptionNamesAreValid(filterOptionByNameAz, filterOptionByNameZa, filterOptionByPriceHighLow, filterOptionByPriceLowHigh){
      await expect(this.filterOptionByNameAz).toHaveText(filterOptionByNameAz);
      await expect(this.filterOptionByNameZa).toHaveText(filterOptionByNameZa);
      await expect(this.filterOptionByPriceHighLow).toHaveText(filterOptionByPriceHighLow);
      await expect(this.filterOptionByPriceLowHigh).toHaveText(filterOptionByPriceLowHigh);

    }
    async selectSortingByValue (optionValue){
      await this.dropDownElement.selectOption(optionValue);
      await expect(this.dropDownElement).toHaveValue(optionValue);
    }

    async verifyFilterOptionByNameAz(nameLocator){
      const productNames = await this.page.locator(nameLocator).allTextContents();
      const sortedNames = [ ...productNames].sort((a,b) => b.localeCompare (a)); 
      expect (productNames).toEqual(sortedNames);
    }
    async verifyFilterOptionByNameZa(nameLocator){
      const productNames = await this.page.locator(nameLocator).allTextContents();
      const sortedNames = [ ...productNames].sort((a,b) => b.localeCompare (b)); 
      expect (productNames).toEqual(sortedNames);
    }
    async verifyItemsSortedByPriceLowHigh(nameLocator){
      const priceTexts = await this.page.locator(nameLocator).allTextContents(); 
      const prices = priceTexts.map(price => parseFloat(price.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    }
    async verifyItemsSortedByPricehighLow(nameLocator){
      const priceTexts = await this.page.locator(nameLocator).allTextContents(); 
      const prices = priceTexts.map(price => parseFloat(price.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sortedPrices);
    }
    async elementIsSelected(optionValue){
      await expect(this.dropdownElement).toHaveValue(optionValue);
    }

    
};
  