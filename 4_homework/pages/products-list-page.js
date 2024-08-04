export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.sortDropdown = page.locator('select.product_sort_container');
  };


  async selectSearchOption(sortingOption) {
    await this.sortDropdown.selectOption({value:sortingOption});
  };

 /* Kazkodel click() man niekaip neveikia su tuo searchbox'u... 
 async selectSearchOption(sortingOption){
    const dropdown = this.page.locator('#header_container > div.header_secondary_container > div > span');
    await dropdown.waitFor("visible");
    await dropdown.click();

    const options = this.page.locator(`#header_container > div.header_seconda ry_container > div > span > select > option[value="${sortingOption}"]`);
    await options.waitFor("visible");
    await options.click();
}*/

  /**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
   async isListSortedByName(asc) {
    let list = await this.itemNameDiv.allTextContents();
    return await this.isListSorted(list, asc);
  };

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
  };

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
  };

  async addProductToCart(product){
    await this.page.locator(`button#add-to-cart-${product}`).click();
  };

  async removeProductfromCart(product){
    await this.page.locator(`button#remove-${product}`).click();
  };
  
  async openPreviewPage(product){
    await this.page.locator('.inventory_item_name').locator(`text=${product}`).click();
  };
};


