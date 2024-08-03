import { expect } from "@playwright/test";

export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
    await expect(this.page).toHaveTitle("Swag Labs");
  }

  async loginToPage(usernameFill, passwordFill) {
    await this.page.locator("#user-name").fill(usernameFill);
    await this.page.locator("#password").fill(passwordFill);
    await this.page.locator("#login-button").click();
  }

  // SFT-1 1. Add dropdown element with options to sort by on the right top corner of the page.
  async sortBy(input) {
    const dropdown = this.page.locator('.product_sort_container');
    // SFT-1 3. Products sorting should be performed on option select action.
    await dropdown.selectOption(input);
  }

  // SFT-2
  async addToCartFirstFromProductsList() {
    const addButton = this.page.locator('.inventory_item button').first();
    await expect(addButton).toHaveText('Add to cart');
    await addButton.click();
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('1');
  }
  async addToCartFirstPreviewProduct() {
    await this.page.locator('.inventory_item_name').first().click();
    await this.page.locator("#add-to-cart").click();
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('1');
  }
  // SFT-2 4. If user clicks ‘Remove’ button related item/product should be removed from the cart.
  async removeButtonProductsList() { 
    const removeButton = this.page.locator('.inventory_item button').first();
    await expect(removeButton).toHaveText('Remove');
    await removeButton.click();
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeHidden();
  }
  async removeButtonPreviewProduct() {
    await this.page.locator("#remove").click();
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeHidden();
  }
  async removeButtonCart() {
    await this.page.locator('.cart_item .cart_button').click();
    const cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toBeHidden();
  }
  


  // Below there are functions that can be used to verify if items are sorted as expected
  // It is just an example, any other solution is welcome as well

  /**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending rder, else false
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
