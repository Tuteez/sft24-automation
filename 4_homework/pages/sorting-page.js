import { expect } from "@playwright/test";

export class SortingPage {
    constructor(page) {
        this.page = page;
        this.dropdownElement = page.locator('.product_sort_container');
        this.sortAZ = this.dropdownElement.locator('option[value="az"]');
        this.sortZA = this.dropdownElement.locator('option[value="za"]');
        this.sortLowToHigh = this.dropdownElement.locator('option[value="lohi"]');
        this.sortHighToLow = this.dropdownElement.locator('option[value="hilo"]');
    }

    async elementIsVisible(elementLocator) {
        // Matomas
        await expect(this.page.locator(elementLocator)).toBeVisible();
    }

    async elementIsEnabled(elementLocator) {
        // Aktyvus
        await expect(this.page.locator(elementLocator)).toBeEnabled();
    }

        async elementHas4Options(elementLocator) {
        // Turi 4 pasirinkimus
        await expect(this.page.locator(elementLocator)).toHaveCount(4);
    }

    async elementIsAtRight(elementLocator) {
        // Puslapio pločio ir elementų koordinates
        const pageWidth = await this.page.evaluate(() => window.innerWidth);
        const dropdownBox = await this.page.locator(elementLocator).boundingBox();
        // Ar elementas yra dešinėje - X koordinatė yra daugiau nei pusė puslapio pločio
        expect(dropdownBox.x + dropdownBox.width / 2).toBeGreaterThan(pageWidth / 2);
    }
    async elementIsAtTop(elementLocator) {
        // Gauti elemento bounding box
        const dropdownBox = await this.page.locator(elementLocator).boundingBox();
        // Ar elementas yra viršuje - Y koordinatė yra mažesnė nei tam tikra vertė pikseliais
        expect(dropdownBox.y).toBeLessThan(150);
    }

    async elementOptionsNamesAreValid(textAZ, textZA, textLH, textHL){
        await expect(this.sortAZ).toHaveText(textAZ);
        await expect(this.sortZA).toHaveText(textZA);
        await expect(this.sortLowToHigh).toHaveText(textLH);
        await expect(this.sortHighToLow).toHaveText(textHL);
    } 

    async selectSortingByValue(optionValue){
        await this.dropdownElement.selectOption(optionValue);
        await expect(this.dropdownElement).toHaveValue(optionValue);        
    }

    async verifyItemsSortedZA(nameLocator){
        //Pasiimame pavadinimus
        const productNames = await this.page.locator(nameLocator).allTextContents(); 

        //Susikuriam naują surikiuotą masyvą - nuo Z iki A
        const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));
        expect(productNames).toEqual(sortedNames);
    }
    async verifyItemsSortedAZ(nameLocator){
        //Pasiimame pavadinimus
        const productNames = await this.page.locator(nameLocator).allTextContents(); 

        //Susikuriam naują surikiuotą masyvą - nuo A iki Z
        const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
        expect(productNames).toEqual(sortedNames);
    }

    async verifyItemsSortedLohi(nameLocator){
        //Pasiimame kainas
        const priceTexts = await this.page.locator(nameLocator).allTextContents(); 

        //Pasiliekam skaičius ir numetam $
        const prices = priceTexts.map(price => parseFloat(price.replace('$', '')));
        // Susikuriam naują surikiuotą masyvą - mažiausios iki didžiausios
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    }

    async verifyItemsSortedHiLo(nameLocator){
        //Pasiimame kainas
        const priceTexts = await this.page.locator(nameLocator).allTextContents(); 

        //Pasiliekam skaičius
        const prices = priceTexts.map(price => parseFloat(price.replace('$', '')));
        //Susikuriam naują surikiuotą masyvą - nuo didžiausios iki mažiausios
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    }
        
    async elementIsSelected(optionValue){
        //Ar selected pagal pateiktą value
        await expect(this.dropdownElement).toHaveValue(optionValue);
    }
}