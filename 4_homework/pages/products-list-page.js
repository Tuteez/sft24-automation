export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.selectSort = page.locator('select[data-test="product-sort-container"]');
    this.changePageSortSelectButton = page.locator("select[class='product_sort_container']");
    this.shoppingCartButton = page.locator('#shopping_cart_container');
    this.productPreviewPageElement = page.locator('.inventory_item_img a');

    this.addItemToCartButton = page.locator('button[class="btn btn_primary btn_small btn_inventory "]');
    this.removeItemFromCartButton = page.locator('button[class="btn btn_secondary btn_small btn_inventory "]');

  }
  async changePageSort(value) {

    await this.changePageSortSelectButton.selectOption(value);
  }
  async enterShoppingCart(){
    await this.shoppingCartButton.click();
  }
  async enterFirstProductPreviewPage() {
    // Wait for the product image link to be visible and click it
    await this.productPreviewPageElement.first().click();
}
 
  async addFirstItemToCart(){
    await this.addItemToCartButton.first().click();
  }

  async removeItemFromProductListPage(){
    await this.removeItemFromCartButton.first().click();
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
   * @param {boolean} asc condition to check True if should be sorted in ascending order, else false
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
