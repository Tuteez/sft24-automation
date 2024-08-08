import { expect } from "@playwright/test";

export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.itemSortDropDown = page.locator('select[class="product-sort-container"]');
    //v- kad pasirinkti pirma elementa svetaineje -v
    this.itemAddItemToCart = page.locator('[name^="add-to-cart-"]');
    this.removeItemFromCart = page.locator('[name="remove-sauce-labs-backpack"]');
    this.removeCartIconChange = page.locator('[data-test="shopping-cart-badge"]');
    this.itemPreviewButton = page.locator('[data-test="inventory-item-name"]');
    this.itemCartButton = page.locator('[data-test="shopping-cart-link"]');
  }
  /**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByName(asc) {
    let list = await this.itemNameDiv.allTextContents();
    console.log('Retrieved list:', list);
    return await this.isListSorted(list, asc);
  }
  /**
   * Checks if products are sorted properly by price
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByPrice(asc) {
    let list = await this.itemPriceDiv.allTextContents();
    console.log('Retrieved list:', list);
    list.forEach((element, index) => {
      list[index] = parseFloat(element.slice(1));
    });

    return await this.isListSorted(list, asc);
  }

  /**
   *
   * @param {Array} list list of elements to check
   * @param {boolean} asc condition to check. True if should be sorted in ascending order, else false
   * @returns True if list sorted as expected, else false
   */
   async isListSorted(list, asc) {
    return list.every(function (num, idx, arr) {
      if (asc === true) {
        return num <= arr[idx + 1] || idx === arr.length - 1 ? true : false;
      }
      return num >= arr[idx + 1] || idx === arr.length - 1 ? true : false;
    });
  }
    
  /**isListSorted(list, asc) {
    return list.every((value, index, arr) => {
        if (index === arr.length - 1) return true;
        return asc ? value.localeCompare(arr[index + 1]) <= 0 : value.localeCompare(arr[index + 1]) >= 0;
    });
}*/
}
