import { expect } from "@playwright/test";

export class ProductsListPage {
  constructor(page) {
    this.page = page;
    this.itemNameDiv = page.locator('div[class="inventory_item_name"]');
    this.itemPriceDiv = page.locator('div[class="inventory_item_price"]');
    this.sortDropdown = page.locator(".product_sort_container");
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.removeProductButton = page.locator('button:has-text("Remove")');
    this.shopCartButton = page.locator("a.shopping_cart_link");
    this.ProductName = page.locator(".inventory_item_name");
    this.cartItemCounter = page.locator(".shopping_cart_badge");
    this.backToProductsButton = page.locator('button:has-text("Back to products")');
    this.activeSortOption = page.locator("span.active_option");
    this.cartProductName = page.locator('.inventory_item_name');
    this.productDetailName = page.locator('.inventory_details_name');
  }

  // Below there are functions that can be used to verify if items are sorted as expected
  // It is just an example, any other solution is welcome as well
  // (you can use what is provided or write your own)

  /**
   * Checks if products are sorted properly by name
   * @param {boolean} asc true if list should be sorted in ascending order, else false
   * @returns {boolean} true if list is sorted in correct order
   */
  // async isListSortedByName(asc) {
  //   let list = await this.itemNameDiv.allTextContents();

  //   return await this.isListSorted(list, asc);
  // }

  // /**
  //  * Checks if products are sorted properly by price
  //  * @param {boolean} asc true if list should be sorted in ascending order, else false
  //  * @returns {boolean} true if list is sorted in correct order
  //  */
  // async isListSortedByPrice(asc) {
  //   let list = await this.itemPriceDiv.allTextContents();
  //   list.forEach((element, index) => {
  //     list[index] = parseFloat(element.slice(1));
  //   });

  //   return await this.isListSorted(list, asc);
  // }

  // /**
  //  *
  //  * @param {Array} list list of elements to check
  //  * @param {boolean} asc condition to check. True if should be sorted in ascending order, else false
  //  * @returns True if list sorted as expected, else false
  //  */
  // async isListSorted(list, asc) {
  //   return list.every(function (num, idx, arr) {
  //     if (asc === true) {
  //       return num <= arr[idx + 1] || idx === arr.length - 1 ? true : false;
  //     }
  //     return num >= arr[idx + 1] || idx === arr.length - 1 ? true : false;
  //   });
  // }

  async validateLogin(productPageTextValidation) {
    await expect(this.page.locator(".title")).toHaveText(
      productPageTextValidation
    );
  }

  async selectSortOptionValue(optionValue) {
    let value;

    switch(optionValue) {
      case "Name (A to Z)":
        value = "az";
        break;
      case "Name (Z to A)":
        value = "za";
        break;
      case "Price (low to high)":
        value = "lohi";
        break;
      case "Price (high to low)":
        value = "hilo";
        break;
      default:
        throw new Error(`Invalid option value: ${optionValue}`);
    }
        return value;
}

  async selectSortOption(optionText) {
    let sortOptionValue = await this.selectSortOptionValue(optionText);
    await this.sortDropdown.selectOption({ value: sortOptionValue });
    let selectedOption = await this.activeSortOption.textContent();
    await expect(selectedOption).toEqual(optionText);
  }

  async getProductNames() {
    return await this.itemNameDiv.allTextContents();
  }

  async getProductPrices() {
    return await this.itemPriceDiv.allTextContents();
  }

  async validateByProductNameZtoA() {
    let productNames = await this.getProductNames();
    let sortedNames = [...productNames].sort().reverse();
    await expect(productNames).toEqual(sortedNames);
  }

  async validateByProductNameAtoZ() {
    let productNames = await this.getProductNames();
    let sortedNames = [...productNames].sort();
    await expect(productNames).toEqual(sortedNames);
  }

  async validateByPriceHighToLow() {
    let productPrices = await this.getProductPrices();
    let sortedPrices = [...productPrices].sort((a, b) => b - a);
    await expect(productPrices).toEqual(sortedPrices);
  }

  async validateByPriceLowToHigh() {
    let productPrices = await this.getProductPrices();
    let sortedPrices = [...productPrices].sort((a, b) => a - b);
    await expect(productPrices).toEqual(sortedPrices);
  }

  async getDropdownOptions() {
    return await this.sortDropdown.locator("option").allTextContents();
  }

  async validateDropdownOptions(expectedOptions) {
    let options = await this.getDropdownOptions();
    await expect(options).toEqual(expectedOptions);
    await expect(options).toHaveLength(expectedOptions.length);
  }

  async addProductToCart(index = 0) {
    let cartCount = await this.retrieveCartItemCounter();
    await this.addToCartButton.nth(index).click();
    await this.validateProductCountInCart(cartCount + 1);
  }

  async removeProductFromCart(index = 0) {
    let cartCount = await this.retrieveCartItemCounter();
    await this.removeProductButton.nth(index).click();
    await this.validateProductCountInCart(cartCount - 1);
  }

  async retrieveCartItemCounter() {
    if ((await this.cartItemCounter.count()) === 0) {
      return 0;
    } else {
      let counterText = await this.cartItemCounter.textContent();
      return parseInt(counterText);
    }
  }

  async goToCart() {
    await this.shopCartButton.click();
  }

  async openPreviewPage(index = 0) {
    await this.ProductName.nth(index).click();
  }

  async validateProductCountInCart(expectedCount) {
    let actualCount = await this.retrieveCartItemCounter();
    await expect(actualCount).toEqual(expectedCount);
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }

  async validateRemoveButtons(expectedCount) {
    let actualCount = await this.removeProductButton.count();
    await expect(actualCount).toEqual(expectedCount);
  }

  async addSameProductTwice(index = 0) {
    let cartCount = await this.retrieveCartItemCounter();
    await this.addToCartButton.nth(index).click();

    let isRemoveButtonVisible = await this.removeProductButton
      .nth(index)
      .isVisible();
    if (!isRemoveButtonVisible) {
      await this.addToCartButton.nth(index).click();
    }

    await this.validateProductCountInCart(cartCount + 1); //count should not change
  }

  async validateThatCartIsEmpty() {
    let cartCount = await this.retrieveCartItemCounter();
    await expect(cartCount).toEqual(0);
  }

  async validateThatRemoveButtonIsVisible() {
    let isRemoveButtonVisible = await this.removeProductButton.isVisible();
    await expect(isRemoveButtonVisible).toEqual(true);
  }

  async validateThatRemoveButtonIsNotVisible() {
    let isRemoveButtonVisible = await this.removeProductButton.isVisible();
    await expect(isRemoveButtonVisible).toEqual(false);
  }

  async saveAddedProductName(isPreviewPage = false) {
    if (isPreviewPage) {
      this.savedProductName = await this.productDetailName.textContent();
    } else {
      this.savedProductName = await this.ProductName.nth(0).textContent();
    }  }

  async validateProductInCart() {
    const cartProductName = await this.cartProductName.textContent();
    await expect(cartProductName).toEqual(this.savedProductName);
  }
}
