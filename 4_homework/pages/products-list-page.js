export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.secondaryHeaderOnTheRight = page.locator(
      '[data-test="secondary-header"] .right_component'
    );
    this.firstAddToChartButton = this.page
      .locator("div.pricebar > button")
      .first();
    this.sortingButton = this.page.locator(".product_sort_container");
    this.sortingOptionAZ = this.page.locator('option[value="az"]');
    this.sortingOptionZA = this.page.locator('option[value="za"]');
    this.sortingOptionLoHi = this.page.locator('option[value="lohi"]');
    this.sortingOptionHiLo = this.page.locator('option[value="hilo"]');
    this.activeSortingOption = this.page.locator('[data-test="active-option"]');
    this.addToCartButtton = this.page.locator(".pricebar > button");
    this.itemName = this.page.locator(".inventory_item_name");
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.cartBadge = page.locator(".shopping_cart_badge");
  }
  async sortingButtonLocationIsCorrect() {
    return this.secondaryHeaderOnTheRight.locator(".product_sort_container");
  }
  async getItemByIndex(number) {
    const addToCartButtons = await this.addToCartButtton.all();
    let addToCartButton = addToCartButtons.at(number);
    return addToCartButton;
  }
  async getActiveOptionText() {
    return this.activeSortingOption.textContent();
  }
  async clickSortingButton() {
    this.sortingButton.evaluateAll(async (options) => {
      console.log("options", options[0]);
      return await options[0].showPicker();
    });
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
