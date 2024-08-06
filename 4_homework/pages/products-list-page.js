import { expect } from "@playwright/test";

export class ProductsListPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
    await expect(this.page).toHaveTitle("Swag Labs");
  }

  async clickAddButton() {
    await this.page.locator("#add-to-cart-sauce-labs-backpack").click();
  }

  async clickRemoveButton() {
    await this.page.locator("#remove-sauce-labs-backpack").click();
  }

  //for US1 AC2
/*   async sortOption(option, expected) {
    let optionDiv = this.page.locator("option[value='${option}']"); 
    await expect(this.page.locator("option[value='${option}']")).toContainText(expected);
  } */

    //for US1 AC3
/*   async sortSelect(option) {
    await this.page.locator("select.product_sort_container").click;
    await this.page.locator("option[value='${option}'").click;
  }  */  

  // Below there are functions that can be used to verify if items are sorted as expected
  // It is just an example, any other solution is welcome as well
  // (you can use what is provided or write your own)

  /**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByName(asc) {
    this.itemNameDiv = this.page.locator('div[class="inventory_item_name"]');
    let list = await this.itemNameDiv.allTextContents();

    return await this.isListSorted(list, asc);
  }

  /**
   * Checks if products are sorted properly by price
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByPrice(asc) {
    this.itemPriceDiv = this.page.locator('div[class="inventory_item_price"]');
    let list = await this.itemPriceDiv.allTextContents();
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
}
