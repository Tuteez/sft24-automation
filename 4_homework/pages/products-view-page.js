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
        return count;
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

    async isListSorted(list, asc) {
        return list.every(function (num, idx, arr) {
          if (asc === true) {
            return num <= arr[idx + 1] || idx === arr.length - 1 ? true : false;
          }
          return num >= arr[idx + 1] || idx === arr.length - 1 ? true : false;
        });
      }

    async isListSortedByName(asc) {
        const option = asc ? 'az' : 'za';
        await this.productSortCont.selectOption(option);

        let list = await this.itemNameDiv.allTextContents();
        return await this.isListSorted(list, asc);
    }


    async isListSortedByPrice(asc) {
        const option = asc ? 'lohi' : 'hilo';
        await this.productSortCont.selectOption(option);

        let list = await this.itemPriceDiv.allTextContents();
        list.forEach((element, index) => {
            list[index] = parseFloat(element.slice(1));
        });
        return await this.isListSorted(list, asc);
    }

    async isListSortedByNameDefault() {
        let list = await this.itemNameDiv.allTextContents();

        return await this.isListSorted(list, true);
    }
}