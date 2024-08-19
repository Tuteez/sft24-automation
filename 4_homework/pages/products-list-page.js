import { expect } from "@playwright/test";

export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
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

  async hasDropdownOptions() {
    await this.page.locator('[data-test="product-sort-container"]').click();
    await expect(this.page.locator('[data-test="product-sort-container"] option')).toContainText(["Name (A to Z)", "Name (Z to A)",
       "Price (low to high)", "Price (high to low)"]);
  }

  async chooseSorting(option) {
    await this.page.locator('[data-test="product-sort-container"]').click();
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }

  async checkActiveSorting(value) {
    await expect(this.page.locator('[data-test="active-option"]')).toContainText(value);
  }

  async checkAddToCartButton() {
    await expect(this.page.locator('#add-to-cart-sauce-labs-backpack')).toContainText('Add to cart');
  }

  async showProductDetails() {
    let randomProduct = Math.floor(Math.random() * 6);
    await this.page.locator(`[data-test="item-${randomProduct}-title-link"]`).click();
  }

  async isAddToCartActive() {
    await this.page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(this.page.locator('#remove-sauce-labs-backpack')).toHaveText('Remove');
  }

  async removeButtonExists() {
    await this.page.locator('#add-to-cart-sauce-labs-backpack').click()
    await expect(this.page.locator('[data-test="remove-sauce-labs-backpack"]')).toContainText('Remove');
    await this.page.locator('[data-test="item-4-title-link"]').click();
  }

  async removeFromCart() {
    await this.page.locator('#add-to-cart-sauce-labs-backpack').click()
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toContainText("1");
    await this.page.locator('#remove-sauce-labs-backpack').click();
    await this.page.locator('[data-test="shopping-cart-badge"]').count()===0;
  }

  async isProductAdded() {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toContainText("1");
  }
}
