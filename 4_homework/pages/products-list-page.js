export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div.inventory_item_name');
    this.itemPriceDiv = page.locator('div.inventory_item_price');
    this.productCards = page.locator('.inventory_item');
    this.sortDropdown = page.locator('.product_sort_container');
    this.cartButton = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
  }

  /**
   * Selects a sorting option from the dropdown menu.
   * @param {string} option - The value of the sorting option to select.
   */
  async selectSortingOption(option) {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Opens the product detail page for the given product name.
   * @param {string} productName - The name of the product to open.
   */
  async openProductPage(productName) {
    let product = this.productCards.locator(`text=${productName}`);
    await product.click();
  }
  /**
   * Checks if a product is present in the cart.
   * @param {string} productName - The name of the product to check.
   * @returns {Promise<boolean>} - A promise that resolves to true if the product is in the cart, otherwise false.
   */
  async isProductInCart(productName) {
    await this.cartButton.click();
    let product = this.cartItems.locator(`text=${productName}`);
    return await product.isVisible();
  }
  /**
   * Adds a product to the cart from the product page.
   */
  async addToCartFromProductPage() {
    let button = this.page.locator('button:has-text("Add to cart")');
    await button.waitFor();
    await button.click();
  }

  /**
   * Removes a product from the cart on the product page.
   */
  async removeFromCartFromProductPage() {
    let button = this.page.locator('button:has-text("Remove")');
    await button.waitFor();
    await button.click();
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
