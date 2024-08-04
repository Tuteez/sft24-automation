export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.secondaryHeaderOnTheRight = page.locator(
      '[data-test="secondary-header"] .right_component'
    );
    this.sortingButton = this.page.locator(".product_sort_container");
    this.sortingOptionAZ = this.page.locator('option[value="az"]');
    this.sortingOptionZA = this.page.locator('option[value="za"]');
    this.sortingOptionLoHi = this.page.locator('option[value="lohi"]');
    this.sortingOptionHiLo = this.page.locator('option[value="hilo"]');
    this.activeSortingOption = this.page.locator('[data-test="active-option"]');
    this.addToChartButtton = this.page.locator(".pricebar> button");
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
  }
  async getActiveOptionText() {
    return this.activeSortingOption.textContent();
  }

  async sortBy(input) {
    const dropdown = this.page.locator(".product_sort_container");

    await dropdown.selectOption(input);
  }

  /**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  async isListSortedByName(asc) {
    let list = await this.itemNameDiv.allTextContents();

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
}
