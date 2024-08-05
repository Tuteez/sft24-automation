import { expect } from "@playwright/test";

export class ProductsViewPage {
    constructor(page) {
        this.page = page;
        this.itemNameDiv = page.locator('div[class="inventory_item_name "]');
        this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
        this.productSortCont = page.locator('select[class="product_sort_container"]');
        this.optionAz = page.locator('select>option[value="az"]');
        this.optionZa = page.locator('select>option[value="za"]');
        this.optionLohi = page.locator('select>option[value="lohi"]');
        this.optionHilo = page.locator('select>option[value="hilo"]');
      }

    async checkSortContainer() {
        const count = await this.productSortCont.count();
        expect(count).toBeGreaterThan(0);
    }

    async isUpperRightSide() {
        const boundingBox = await this.productSortCont.boundingBox();
        const viewportHeight = await this.page.evaluate(() => window.innerHeight);
        const viewportWidth = await this.page.evaluate(() => window.innerWidth);
        const isUpperSide = boundingBox.y < viewportHeight / 3;
        const isRightSide = boundingBox.x > 2 * viewportWidth / 3;
        expect(isUpperSide && isRightSide).toBe(true);
      }
    
    async checkDropdownOptions() {
        const expectedOptions = {
            'az': 'Name (A to Z)',
            'za': 'Name (Z to A)',
            'lohi': 'Price (low to high)',
            'hilo': 'Price (high to low)'
        };
        await expect(this.optionAz).toHaveText(expectedOptions.az);
        await expect(this.optionZa).toHaveText(expectedOptions.za);
        await expect(this.optionLohi).toHaveText(expectedOptions.lohi);
        await expect(this.optionHilo).toHaveText(expectedOptions.hilo);
    }

    async azSorting() {
        let listOfProducts = await this.itemNameDiv.allTextContents();
        let sortedListOfProducts = listOfProducts.sort();
        await this.productSortCont.selectOption('az');
        let azSortedList = await this.itemNameDiv.allTextContents();
        expect(azSortedList).toEqual(sortedListOfProducts);
    }

    async zaSorting() {
        let listOfProducts = await this.itemNameDiv.allTextContents();
        listOfProducts.sort((a, b) => b.localeCompare(a));
        await this.productSortCont.selectOption('za');
        let zaSortedList = await this.itemNameDiv.allTextContents();
        expect(zaSortedList).toEqual(listOfProducts);
    }

    async ascendingPriceSorting() {
        let listOfPrices = await this.itemPriceDiv.allTextContents();
        listOfPrices = listOfPrices.map(price => parseFloat(price.slice(1)));
        let sortedListOfPrices = listOfPrices.sort((a, b) => a - b);
        await this.productSortCont.selectOption('lohi');
        let priceSortedList = await this.itemPriceDiv.allTextContents();
        priceSortedList = priceSortedList.map(price => parseFloat(price.slice(1)));
        expect(priceSortedList).toEqual(sortedListOfPrices);
    }

    async priceDescendingSorting() {
        let listOfPrices = await this.itemPriceDiv.allTextContents();
        listOfPrices = listOfPrices.map(price => parseFloat(price.slice(1)));
        let sortedListOfPrices = listOfPrices.sort((a, b) => b - a);
        await this.productSortCont.selectOption('hilo');
        let priceSortedList = await this.itemPriceDiv.allTextContents();
        priceSortedList = priceSortedList.map(price => parseFloat(price.slice(1)));
        expect(priceSortedList).toEqual(sortedListOfPrices);
    }

    async DefaultAzSorting() {
        let listOfProducts = await this.itemNameDiv.allTextContents();
        let sortedListOfProducts = listOfProducts.sort();
        expect(listOfProducts).toEqual(sortedListOfProducts);
    }
}