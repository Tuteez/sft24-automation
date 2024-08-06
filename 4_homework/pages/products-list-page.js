import { expect } from "@playwright/test";
import { text } from "stream/consumers";

export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator(".inventory_item_name");
    this.itemPriceDiv = page.locator(".inventory_item_price");
  }

  async openProductPage(product_number){
    let item_number_text = '#item_' + product_number.toString() + '_title_link'
    await this.page.locator(item_number_text).click();
  }

  async addToCart(product_name){
    let locator_add = '#add-to-cart-' + product_name;
    await this.page.locator(locator_add).click();
  }
  async checkAdded(product_name){
    let locator_remove = '#remove-' + product_name;
    await expect(this.page.locator(".shopping_cart_badge")).toHaveText("1");
    await expect(this.page.locator(locator_remove)).toHaveText("Remove");
  }
  async removeFromCart(product_name){
    let locator_remove = '#remove-' + product_name;
    await this.page.locator(locator_remove).click();
  }
  async checkRemoved(product_name){
    let locator_add = '#add-to-cart-' + product_name;
    await expect(this.page.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(this.page.locator(locator_add)).toHaveText("Add to cart");
  }

  // Below there are functions that can be used to verify if items are sorted as expected
  // It is just an example, any other solution is welcome as well
  // (you can use what is provided or write your own)

  /**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByName(asc) {
    let list = await this.itemNameDiv.allTextContents();
    console.log("the list ", list);
    console.log("the requested order, true=ascending ", asc);
    console.log("sort check value ", this.isListSorted(list, asc));
    return await this.isListSorted(list, asc);
  }

  /**
   * Checks if products are sorted properly by price
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByPrice(asc) {
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

  async sort(order){
    await this.page.locator(".product_sort_container").selectOption(order)
  }
}
